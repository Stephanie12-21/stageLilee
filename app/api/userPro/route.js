import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Début du traitement des données du formulaire");
    const body = await req.formData();

    // Récupérer les valeurs du formulaire
    const nomSociete = body.get("nomSociete");
    const siret = body.get("siret");
    const codePostal = body.get("codePostal");
    const adresse = body.get("adresse");
    const ville = body.get("ville");
    const secteurActivite = body.get("secteurActivite");
    const typeSociete = body.get("typeSociete").trim(); // Supprime les espaces

    // Informations de l'admin du compte pro
    const nom = body.get("nom");
    const prenom = body.get("prenom");
    const email = body.get("email");
    const phone = body.get("phone");
    const password = body.get("password");
    const role = body.get("role");
    const statutUser = body.get("statutUser");
    const imageFile = body.get("imageFile");

    console.log("Données de l'admin du compte reçues :", {
      nom,
      prenom,
      email,
      phone,
      role,
      statutUser,
      imageFile,
    });
    console.log("Données de la société reçues :", {
      secteurActivite,
      typeSociete,
      ville,
      adresse,
      codePostal,
      siret,
      nomSociete,
    });

    // Vérification de la validité du type de société
    const validTypes = [
      "ENTREPRISE_INDIVIDUELLE",
      "SOCIETE_PRIVEE",
      "SOCIETE_PUBLIQUE",
      "COOPERATIVE",
      "ASSOCIATION",
    ];

    if (!validTypes.includes(typeSociete)) {
      console.error("Type de société invalide :", typeSociete);
      return NextResponse.json(
        { message: "Type de société invalide." },
        { status: 400 }
      );
    }

    // Vérification si l'email existe déjà
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      console.log("Email déjà utilisé");
      return NextResponse.json(
        { message: "Un compte pro avec cet email existe déjà." },
        { status: 409 }
      );
    }

    // Vérification si le numéro de téléphone existe déjà
    const existingUserByPhone = await db.user.findUnique({
      where: { phone },
    });
    if (existingUserByPhone) {
      console.log("Numéro de téléphone déjà utilisé");
      return NextResponse.json(
        { message: "Un compte pro avec ce numéro de téléphone existe déjà." },
        { status: 409 }
      );
    }

    // Vérification si le numéro de téléphone existe déjà
    const existingCompany = await db.company.findUnique({
      where: { siret },
    });
    if (existingCompany) {
      console.log("Numéro de siret déjà utilisé");
      return NextResponse.json(
        { message: "Un compte pro avec ce numéro de siret existe déjà." },
        { status: 409 }
      );
    }

    // Hachage du mot de passe
    const hashedPassword = await hash(password, 10);

    // URL de l'image
    let imageUrl = null;

    // Vérifiez si imageFile est présent
    if (imageFile) {
      console.log("Début de l'upload de l'image");
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "ko4bjtic");

      // Téléchargement de l'image sur Cloudinary
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();
      console.log("Résultat de l'upload :", uploadResult);

      if (uploadResponse.ok && uploadResult.secure_url) {
        imageUrl = uploadResult.secure_url;
        console.log("Image uploadée avec succès, URL :", imageUrl);
      } else {
        console.error("Erreur lors de l'upload de l'image :", uploadResult);
        throw new Error("Échec de l'upload de l'image");
      }
    } else {
      console.log("Aucune image fournie pour l'upload.");
    }

    // Création de la société
    console.log("Création de la société");
    const newCompany = await db.company.create({
      data: {
        nomSociete,
        siret,
        secteurActivite,
        codePostal,
        ville,
        adresse,
        typeSociete,
      },
    });

    // Création du compte utilisateur
    console.log("Création du compte pro");
    const newComptePro = await db.user.create({
      data: {
        nom,
        prenom,
        email,
        phone,
        hashPassword: hashedPassword,
        role,
        statutUser,
        companyId: newCompany.id,
      },
    });

    // Associer l'image si elle existe
    if (imageUrl) {
      console.log("Association de l'image avec l'utilisateur");
      await db.profileImage.create({
        data: {
          path: imageUrl,
          userId: newComptePro.id,
        },
      });
    }

    // Exclure le mot de passe de la réponse
    const { hashPassword: _, ...rest } = newComptePro;

    console.log("Compte créé avec succès");
    return NextResponse.json(
      {
        comptePro: rest,
        message:
          "Compte créé avec succès. Les données ont été envoyées à la base de données et l'image a été enregistrée.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du compte :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
