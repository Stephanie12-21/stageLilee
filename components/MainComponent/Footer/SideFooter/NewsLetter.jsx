// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";

// const NewsLetter = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async () => {
//     if (!email) {
//       alert("Veuillez entrer un email valide");
//       return;
//     }

//     try {
//       // Envoi de l'email au backend
//       const response = await fetch("/api/newsletter", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }), // Envoie de l'email dans le corps de la requête
//       });

//       if (response.ok) {
//         console.log("Email envoyé avec succès");
//         alert("Vous êtes bien abonné à la newsletter!");
//       } else {
//         console.error("Erreur lors de l'envoi de l'email");
//         alert("Erreur lors de l'abonnement. Essayez à nouveau.");
//       }
//     } catch (error) {
//       console.error("Erreur réseau:", error);
//       alert("Erreur lors de la connexion au serveur.");
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col space-y-3">
//         <Label className="text-[22px] font-bold text-white ">
//           Abonnez-vous à notre{" "}
//           <span className="text-[#FCA311]">newsletter</span> pour ne rien
//           manquer.
//         </Label>
//         <div className="flex gap-x-4">
//           <Input
//             id="userEmail"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Votre adresse email"
//             className="font-medium text-[16px] bg-transparent text-[#FAFAFA]"
//           />
//           <Button
//             onClick={handleSubmit}
//             className="rounded-[8px] text-[#15213D] font-bold px-9 text-[16px] bg-white hover:bg-white"
//           >
//             S&apos;abonner
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsLetter;
// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";

// const NewsLetter = () => {
//   const [email, setEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs
//   const [successMessage, setSuccessMessage] = useState(""); // Pour afficher le message de succès

//   const handleSubmit = async () => {
//     if (!email) {
//       alert("Veuillez entrer un email valide");
//       return;
//     }

//     try {
//       const response = await fetch("/api/newsletter", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {

//         setSuccessMessage("Vous êtes bien abonné à la newsletter!");
//         setErrorMessage(""); // Effacer le message d'erreur si l'abonnement est réussi
//       } else if (response.status === 409) {
//         setErrorMessage("Vous êtes déjà abonné avec cet email.");
//         setSuccessMessage(""); // Effacer le message de succès si un conflit est trouvé
//       } else {
//         setErrorMessage("Erreur lors de l'abonnement. Essayez à nouveau.");
//         setSuccessMessage(""); // Effacer le message de succès en cas d'erreur
//       }
//     } catch (error) {
//       console.error("Erreur réseau:", error);
//       setErrorMessage("Erreur lors de la connexion au serveur.");
//       setSuccessMessage(""); // Effacer le message de succès en cas d'erreur réseau
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col space-y-3">
//         <Label className="text-[22px] font-bold text-white ">
//           Abonnez-vous à notre{" "}
//           <span className="text-[#FCA311]">newsletter</span> pour ne rien
//           manquer.
//         </Label>
//         <div className="flex gap-x-4">
//           <Input
//             id="userEmail"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Votre adresse email"
//             className="font-medium text-[16px] bg-transparent text-[#FAFAFA]"
//           />
//           <Button
//             onClick={handleSubmit}
//             className="rounded-[8px] text-[#15213D] font-bold px-9 text-[16px] bg-white hover:bg-white"
//           >
//             S&apos;abonner
//           </Button>
//         </div>

//         {/* Affichage du message de succès */}
//         {successMessage && (
//           <p className="text-green-500 font-medium mt-2">{successMessage}</p>
//         )}

//         {/* Affichage du message d'erreur */}
//         {errorMessage && (
//           <p className="text-red-500 font-medium mt-2">{errorMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewsLetter;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Veuillez entrer un email valide");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Vous êtes bien abonné à la newsletter !");
        setEmail("");
      } else if (response.status === 409) {
        toast.error("Vous êtes déjà abonné avec cet email.");
        setEmail("");
      } else {
        toast.error("Erreur lors de l'abonnement. Essayez à nouveau.");
        setEmail("");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      toast.error("Erreur lors de la connexion au serveur.");
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Conteneur pour afficher les toasts */}
      <div className="flex flex-col space-y-3">
        <Label className="text-[22px] font-bold text-white">
          Abonnez-vous à notre{" "}
          <span className="text-[#FCA311]">newsletter</span> pour ne rien
          manquer.
        </Label>
        <div className="flex gap-x-4">
          <Input
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="font-medium text-[16px] bg-transparent text-[#FAFAFA]"
          />
          <Button
            onClick={handleSubmit}
            className="rounded-[8px] text-[#15213D] font-bold px-9 text-[16px] bg-white hover:bg-white"
          >
            S&apos;abonner
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
