// "use client";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import jsPDF from "jspdf";

// const Partenaires = () => {
//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 0.2,
//   });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         when: "beforeChildren",
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const generatePDFs = () => {
//     generateListPDF();
//     generateContractPDF();
//   };

//   const generateListPDF = () => {
//     const doc = new jsPDF();
//     const marginLeft = 20;
//     const marginTop = 20;
//     const lineSpacing = 10;
//     let currentY = 20;

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text("Liste des pièces à fournir", marginLeft, currentY);

//     currentY += 10;
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     const content = `
// Entrehandi.com, Mr Marc Denneval
// 22 bis rue du Calabrun
// 0787308386
// entrehandi@gmail.com

// Pièces à fournir pour la réalisation de votre encart publicitaire:
// - Logo de votre entreprise
// - Coordonnées de l’entreprise :
//   - Nom
//   - Adresse
//   - Numéro de téléphone
//   - Adresse mail
//   - Liens vers le site internet (s’il y a)
//   - Liens vers les réseaux sociaux (s’il y a)
// - Si vous le souhaitez, un court article présentant votre entreprise.
// - Pour la mise en avant de vos offres promotionnelles ou nouveautés,
//   pensez à nous envoyer des photos, des tarifs et toutes autres informations.

// Merci de nous envoyer par mail les documents nécessaires !
//     `;
//     const lines = doc.splitTextToSize(content, 170);
//     doc.text(lines, marginLeft, (currentY += 10));
//     doc.save("Liste-des-pieces-a-fournir-pour-la-publicite-sur-Lilee.pdf");
//   };

//   const generateContractPDF = () => {
//     const doc = new jsPDF();
//     const marginLeft = 20;
//     let currentY = 20;

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text("Liste des pièces à fournir", marginLeft, currentY);

//     currentY += 10;
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     const content = `
// <style>
//         body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             margin: 20px;
//             background-color: #f9f9f9;
//         }
//         .contract-container {
//             background: #ffffff;
//             padding: 20px;
//             border: 1px solid #ddd;
//             border-radius: 8px;
//             max-width: 800px;
//             margin: auto;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }
//         h1 {
//             text-align: center;
//             font-size: 24px;
//             color: #333;
//             margin-bottom: 20px;
//         }
//         .section-title {
//             font-weight: bold;
//             color: #444;
//             margin-top: 20px;
//             font-size: 18px;
//         }
//         ul {
//             margin: 10px 0 20px 20px;
//         }
//         li {
//             margin-bottom: 10px;
//         }
//         .checkbox-section {
//             margin: 15px 0;
//         }
//         .checkbox-label {
//             margin-right: 20px;
//         }
//         .signature-section {
//             margin-top: 30px;
//             display: flex;
//             justify-content: space-between;
//         }
//         .signature-line {
//             display: flex;
//             flex-direction: column;
//             text-align: center;
//             width: 45%;
//         }
//         .line {
//             border-bottom: 1px solid #444;
//             margin: 10px 0;
//         }
//     </style>
// </head>
// <body>
//     <div class="contract-container">
//         <h1>Liste des pièces à fournir</h1>
//         <p>
//             Le présent contrat est signé entre <strong>Entrehandi.com</strong>,
//             Mr Marc Denneval, 22 bis rue du Calabrun, et l’entreprise
//             <span class="line"></span>.
//         </p>
//         <p class="section-title">Engagements d’Entrehandi.com :</p>
//         <ul>
//             <li>Fournir un encart publicitaire pour la durée de la souscription.</li>
//             <li>Promouvoir sur ses réseaux sociaux avec une publication minimum par mois.</li>
//             <li>Mettre en avant des promotions exceptionnelles à la demande du client.</li>
//         </ul>
//         <p class="section-title">Engagements du client :</p>
//         <ul>
//             <li>Fournir les informations nécessaires à la mise en œuvre de l’encart publicitaire.</li>
//         </ul>
//         <p class="section-title">Durée de la souscription :</p>
//         <div class="checkbox-section">
//             <label class="checkbox-label">
//                 <input type="checkbox"> 1 mois
//             </label>
//             <label class="checkbox-label">
//                 <input type="checkbox"> 3 mois
//             </label>
//             <label class="checkbox-label">
//                 <input type="checkbox"> 6 mois
//             </label>
//             <label class="checkbox-label">
//                 <input type="checkbox"> 12 mois
//             </label>
//         </div>
//         <p>Le montant de la souscription est de <strong>99,00 euros par mois</strong>.</p>
//         <p>Mode de règlement choisi :</p>
//         <div class="checkbox-section">
//             <label class="checkbox-label">
//                 <input type="checkbox"> Chèque
//             </label>
//             <label class="checkbox-label">
//                 <input type="checkbox"> Virement bancaire
//             </label>
//         </div>
//         <p>Fait à <span class="line"></span>, le <span class="line"></span>.</p>
//         <div class="signature-section">
//             <div class="signature-line">
//                 <span>Le fournisseur :</span>
//                 <span class="line"></span>
//             </div>
//             <div class="signature-line">
//                 <span>Le client :</span>
//                 <span class="line"></span>
//             </div>
//         </div>
//     </div>
//     `;
//     const lines = doc.splitTextToSize(content, 170);
//     doc.text(lines, marginLeft, (currentY += 10));
//     doc.save("Contrat-de-service-de-publicite-sur-Lilee.pdf");
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       variants={containerVariants}
//       className="w-full"
//     >
//       <div className="flex flex-col items-center mt-8 px-4 mb-9">
//         <motion.p
//           variants={itemVariants}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold mb-4 text-center"
//         >
//           Rejoignez-nous
//         </motion.p>

//         <motion.p
//           variants={itemVariants}
//           transition={{ duration: 0.5 }}
//           className="text-center text-lg leading-relaxed max-w-2xl mb-6"
//         >
//           Ne manquez pas cette opportunité unique de mettre en lumière votre
//           engagement et d&apos;accroître votre visibilité grâce à Lilee.
//           Contactez-nous dès aujourd&apos;hui pour bénéficier de nos offres de
//           lancement et rejoindre notre communauté d&apos;entreprises engagées.
//         </motion.p>

//         <motion.div
//           variants={itemVariants}
//           transition={{ duration: 0.5 }}
//           className="flex justify-between w-full max-w-lg"
//         >
//           <Button
//             onClick={generatePDFs}
//             className="px-4 py-2 bg-[#15213d] text-white text-base rounded-lg"
//           >
//             Devenir partenaire de Lilee
//           </Button>
//           <Button
//             variant="ghost"
//             className="px-4 py-2 border border-[#15213d] text-base text-[#15213d] rounded-lg hover:bg-[#15213d] hover:text-white"
//           >
//             Nos partenaires engagés
//           </Button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Partenaires;

"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import jsPDF from "jspdf";

const Partenaires = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const generatePDFs = () => {
    generateListPDF();
    generateContractPDF();
  };

  const generateListPDF = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    let currentY = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Liste des pièces à fournir", marginLeft, currentY);

    currentY += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const content = `
Entrehandi.com, Mr Marc Denneval
22 bis rue du Calabrun
0787308386
entrehandi@gmail.com

Pièces à fournir pour la réalisation de votre encart publicitaire:
- Logo de votre entreprise
- Coordonnées de l’entreprise :
  - Nom
  - Adresse
  - Numéro de téléphone
  - Adresse mail
  - Liens vers le site internet (s’il y a)
  - Liens vers les réseaux sociaux (s’il y a)
- Si vous le souhaitez, un court article présentant votre entreprise.
- Pour la mise en avant de vos offres promotionnelles ou nouveautés,
  pensez à nous envoyer des photos, des tarifs et toutes autres informations.

Merci de nous envoyer par mail les documents nécessaires !`;

    const lines = doc.splitTextToSize(content, 170);
    doc.text(lines, marginLeft, (currentY += 10));
    doc.save("Liste-des-pieces-a-fournir-pour-la-publicite-sur-Lilee.pdf");
  };

  const generateContractPDF = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    let currentY = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Liste des pièces à fournir", marginLeft, currentY);

    currentY += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Add Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(
      "Le présent contrat est signé entre Entrehandi.com, Mr Marc Denneval, 22 bis rue du Calabrun, et l’entreprise ____________________________.",
      marginLeft,
      currentY
    );

    currentY += 10;

    // Engagements d'Entrehandi.com
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Engagements d’Entrehandi.com :", marginLeft, currentY);
    currentY += 8;
    doc.setFont("helvetica", "normal");
    const commitments = [
      "Fournir un encart publicitaire pour la durée de la souscription.",
      "Promouvoir sur ses réseaux sociaux avec une publication minimum par mois.",
      "Mettre en avant des promotions exceptionnelles à la demande du client.",
    ];
    commitments.forEach((commitment, index) => {
      doc.text(`- ${commitment}`, marginLeft + 10, currentY + index * 8);
    });

    currentY += commitments.length * 8 + 10;

    // Engagements du client
    doc.setFont("helvetica", "bold");
    doc.text("Engagements du client :", marginLeft, currentY);
    currentY += 8;
    doc.setFont("helvetica", "normal");
    doc.text(
      "- Fournir les informations nécessaires à la mise en œuvre de l’encart publicitaire.",
      marginLeft + 10,
      currentY
    );

    currentY += 10;

    // Durée de la souscription
    doc.setFont("helvetica", "bold");
    doc.text("Durée de la souscription :", marginLeft, currentY);
    currentY += 8;
    doc.setFont("helvetica", "normal");
    doc.text(
      "□ 1 mois   □ 3 mois   □ 6 mois   □ 12 mois",
      marginLeft + 10,
      currentY
    );

    currentY += 10;
    doc.text(
      "Le montant de la souscription est de 99,00 euros par mois.",
      marginLeft + 10,
      currentY
    );
    currentY += 10;

    // Mode de règlement
    doc.setFont("helvetica", "bold");
    doc.text("Mode de règlement choisi :", marginLeft, currentY);
    currentY += 8;
    doc.setFont("helvetica", "normal");
    doc.text("□ Chèque   □ Virement bancaire", marginLeft + 10, currentY);

    currentY += 10;
    doc.text(
      "Fait à _____________________, le _____________________.",
      marginLeft + 10,
      currentY
    );

    currentY += 20;

    // Signatures
    doc.setFont("helvetica", "bold");
    doc.text("Signatures :", marginLeft, currentY);
    currentY += 10;

    // Signature lines
    doc.text("Le fournisseur :", marginLeft, currentY);
    doc.line(marginLeft + 40, currentY + 2, marginLeft + 160, currentY + 2); // Horizontal line for signature
    currentY += 10;
    doc.text("Le client :", marginLeft, currentY);
    doc.line(marginLeft + 40, currentY + 2, marginLeft + 160, currentY + 2); // Horizontal line for signature

    doc.save("Contrat-de-service-de-publicite-sur-Lilee.pdf");
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full"
    >
      <div className="flex flex-col items-center mt-8 px-4 mb-9">
        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-center"
        >
          Rejoignez-nous
        </motion.p>

        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.5 }}
          className="text-center text-lg leading-relaxed max-w-2xl mb-6"
        >
          Ne manquez pas cette opportunité unique de mettre en lumière votre
          engagement et d&apos;accroître votre visibilité grâce à Lilee.
          Contactez-nous dès aujourd&apos;hui pour bénéficier de nos offres de
          lancement et rejoindre notre communauté d&apos;entreprises engagées.
        </motion.p>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5 }}
          className="flex justify-between w-full max-w-lg"
        >
          <Button
            onClick={generatePDFs}
            className="px-4 py-2 bg-[#15213d] text-white text-base rounded-lg"
          >
            Devenir partenaire de Lilee
          </Button>
          <Button
            variant="ghost"
            className="px-4 py-2 border border-[#15213d] text-base text-[#15213d] rounded-lg hover:bg-[#15213d] hover:text-white"
          >
            Nos partenaires engagés
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Partenaires;
