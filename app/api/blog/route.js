import { db } from "@/lib/db";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

async function sendNewsletterNotification(titre) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const abonnés = await db.newsletter.findMany({ select: { email: true } });

    if (!abonnés.length) {
      console.log("Aucun abonné trouvé.");
      return;
    }

    for (const { email } of abonnés) {
      const mailOptions = {
        from: `"Lilee" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Nouvel article publié sur LILEE",
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      

      <div style="background-color: #FCA311; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Du nouveau chez Lilee!</h1>
      </div>

      <div style="padding: 20px; line-height: 1.5; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

        <p style="font-size: 16px; margin-bottom: 15px;">
          Lilee a publié un nouvel article. Nous vous invitons à y jeter un coup d'oeil, au cas ça vous aidera.
        </p>

        

        <p style="font-size: 16px; margin-bottom: 15px;">À bientôt,</p>
        <p style="font-size: 16px; font-weight: bold;">L'équipe de Lilee</p>
      </div>

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>© 2024 Lilee. Tous droits réservés.</p>
      </div>
    </div>
  `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Notification envoyée à : ${email}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications :", error);
    throw new Error("Erreur lors de l'envoi des notifications.");
  }
}

export async function POST(request) {
  try {
    const body = await request.formData();
    const titre = body.get("titre");
    const contenu = body.get("contenu");
    const categorieArticle = body.get("categorieArticle");
    const images = body.getAll("images");

    if (!titre || !contenu || !categorieArticle) {
      return new NextResponse(
        JSON.stringify({
          message: "Tous les champs sont requis.",
        }),
        { status: 400 }
      );
    }

    const imageUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ko4bjtic");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();
      if (uploadResponse.ok && uploadResult.secure_url) {
        imageUrls.push(uploadResult.secure_url);
      } else {
        throw new Error("Échec de l'upload de l'image.");
      }
    }

    const newArticle = await db.article.create({
      data: { titre, contenu, categorieArticle },
    });

    const articleId = newArticle.id;
    const imageInsertions = imageUrls.map((imageUrl) =>
      db.image.create({
        data: { path: imageUrl, articleId },
      })
    );

    await Promise.all(imageInsertions);

    await sendNewsletterNotification(titre);

    return new NextResponse(
      JSON.stringify({
        message: "Article et images créés avec succès.",
        article: newArticle,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'article et des images :",
      error
    );
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const articles = await db.article.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    const formattedArticles = articles.map((article) => ({
      ...article,
      imageUrl: article.images[0]?.path || null,
    }));

    return new NextResponse(JSON.stringify(formattedArticles), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
