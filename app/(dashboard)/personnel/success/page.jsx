"use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const SuccessPage = () => {
//   const router = useRouter();
//   const [isPaymentVerified, setIsPaymentVerified] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async () => {
//     console.log("Annonce soumise après paiement validé.");
//   };

//   useEffect(() => {
//     const sessionId = sessionStorage.getItem("session_id");
//     console.log("sessionId: ", sessionId);

//     if (sessionId) {
//       const verifyPayment = async () => {
//         try {
//           const response = await fetch("/api/paiement/paiementStatus", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ sessionId }),
//           });

//           const result = await response.json();

//           if (response.ok && result.success) {
//             setIsPaymentVerified(true);
//             handleSubmit(); // Appel de handleSubmit une fois que le paiement est validé
//           } else {
//             setError("Paiement non validé. Veuillez réessayer.");
//           }
//         } catch (error) {
//           console.error("Erreur lors de la vérification du paiement", error);
//           setError(
//             "Une erreur est survenue lors de la vérification du paiement."
//           );
//         }
//       };

//       verifyPayment();
//     } else {
//       setError("Aucune session de paiement trouvée.");
//     }
//   }, []); // Hook exécuté une seule fois lors du rendu de la page

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (isPaymentVerified) {
//     return (
//       <div>
//         <h1>Merci pour votre paiement !</h1>
//         <p>Votre annonce sera soumise après la validation du paiement.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Vérification du paiement...</h1>
//       <p>Nous vérifions votre paiement. Merci de patienter.</p>
//     </div>
//   );
// };

// export default SuccessPage;
//code qui marche  sans ajout des données
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const SuccessPage = () => {
//   const router = useRouter();
//   const [isPaymentVerified, setIsPaymentVerified] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async () => {
//     console.log("Annonce soumise après paiement validé.");
//   };

//   useEffect(() => {
//     const sessionId = sessionStorage.getItem("session_id");

//     console.log("sessionId:", sessionId);

//     if (sessionId) {
//       const verifyPayment = async () => {
//         try {
//           const response = await fetch("/api/paiement/paiementStatus", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ sessionId }),
//           });

//           const result = await response.json();

//           if (response.ok && result.success) {
//             setIsPaymentVerified(true);
//             handleSubmit();
//           } else {
//             setError("Paiement non validé. Veuillez réessayer.");
//           }
//         } catch (error) {
//           console.error("Erreur lors de la vérification du paiement", error);
//           setError(
//             "Une erreur est survenue lors de la vérification du paiement."
//           );
//         }
//       };

//       verifyPayment();
//     } else {
//       setError("Aucune session de paiement trouvée.");
//     }
//   }, []); // Hook exécuté une seule fois lors du rendu de la page

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (isPaymentVerified) {
//     return (
//       <div>
//         <h1>Merci pour votre paiement !</h1>
//         <p>Votre annonce sera soumise après la validation du paiement.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Vérification du paiement...</h1>
//       <p>Nous vérifions votre paiement. Merci de patienter.</p>
//     </div>
//   );
// };

// export default SuccessPage;
//code test

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation"; // Pour récupérer la route et les query params

// const SuccessPage = () => {
//   const router = useRouter();
//   const [isPaymentVerified, setIsPaymentVerified] = useState(false);
//   const [error, setError] = useState(null);

//   // Utilisation de useCallback pour mémoriser handleSubmit
//   const handleSubmit = useCallback(async () => {
//     console.log("Annonce soumise après paiement validé.");
//     // Ici, tu peux appeler l'API ou une fonction de soumission, comme handleSubmit dans addAnnonce
//     router.push("/personnel/annonces/addAnnonce?paymentStatus=success"); // Rediriger vers la page d'ajout d'annonce
//   }, [router]); // Dépendance à router, car il change parfois

//   useEffect(() => {
//     const sessionId = sessionStorage.getItem("session_id");

//     console.log("sessionId:", sessionId);

//     if (sessionId) {
//       const verifyPayment = async () => {
//         try {
//           const response = await fetch("/api/paiement/paiementStatus", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ sessionId }),
//           });

//           const result = await response.json();

//           if (response.ok && result.success) {
//             setIsPaymentVerified(true);
//             handleSubmit(); // Soumettre l'annonce si paiement validé
//           } else {
//             setError("Paiement non validé. Veuillez réessayer.");
//           }
//         } catch (error) {
//           console.error("Erreur lors de la vérification du paiement", error);
//           setError(
//             "Une erreur est survenue lors de la vérification du paiement."
//           );
//         }
//       };

//       verifyPayment();
//     } else {
//       setError("Aucune session de paiement trouvée.");
//     }
//   }, [handleSubmit]); // Ajoute handleSubmit dans les dépendances si nécessaire

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (isPaymentVerified) {
//     return (
//       <div>
//         <h1>Merci pour votre paiement !</h1>
//         <p>Votre annonce sera soumise après la validation du paiement.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Vérification du paiement...</h1>
//       <p>Nous vérifions votre paiement. Merci de patienter.</p>
//     </div>
//   );
// };

// export default SuccessPage;

//CODE TEST
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Vérifier si le paiement est réussi, et rediriger vers la page AddAnnonce avec le paramètre paymentStatus
    const sessionId = sessionStorage.getItem("session_id");

    if (sessionId) {
      fetch("/api/paiement/paiementStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            router.push(`/personnel/annonces/addAnnonce?paymentStatus=success`);
          } else {
            router.push(`/personnel/annonces/addAnnonce?paymentStatus=failed`);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la vérification du paiement", error);
        });
    }
  }, [router]);

  return <div>Vérification du paiement en cours...</div>;
};

export default SuccessPage;
