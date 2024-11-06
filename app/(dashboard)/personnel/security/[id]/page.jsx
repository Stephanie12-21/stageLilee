// "use client";

// import React, { useState } from "react";
// import { AlertCircle, CheckCircle2 } from "lucide-react";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { useSession } from "next-auth/react";

// const PasswordChangeForm = () => {
//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [step, setStep] = useState(1); // Variable pour suivre l'étape
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const { data: session } = useSession();

//   // Gestion des modifications dans le formulaire
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setError("");
//     setSuccess(false);
//   };

//   // Soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!session || !session.user || !session.user.id) {
//       setError("Impossible de récupérer l'ID de l'utilisateur.");
//       return;
//     }

//     const userId = session.user.id;
//     console.log("ID de l'utilisateur de la session actuelle :", userId);

//     if (step === 1) {
//       // Étape 1 : Vérification du mot de passe actuel
//       if (!formData.currentPassword) {
//         setError("Le mot de passe actuel est requis");
//         return;
//       }

//       // Appel de l'API pour vérifier si le mot de passe actuel est correct
//       try {
//         const response = await fetch(`/api/user/verifyPswrd/`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userId, // ID utilisateur
//             currentPassword: formData.currentPassword, // Mot de passe actuel
//           }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           console.log(" mot de passe correspondant");
//           setStep(2);
//           setError("");
//         } else {
//           // Si le mot de passe est incorrect
//           setError(data.error || "Le mot de passe actuel est incorrect");
//         }
//       } catch (error) {
//         setError(
//           "Une erreur est survenue lors de la vérification du mot de passe"
//         );
//         console.error(
//           "Erreur lors de la vérification du mot de passe :",
//           error
//         );
//       }
//     } else if (step === 2) {
//       // Étape 2 : Validation du nouveau mot de passe
//       if (!formData.newPassword || !formData.confirmPassword) {
//         setError("Tous les champs sont obligatoires");
//         return;
//       }

//       if (formData.newPassword.length < 8) {
//         setError("Le nouveau mot de passe doit contenir au moins 8 caractères");
//         return;
//       }

//       if (formData.newPassword !== formData.confirmPassword) {
//         setError("Les nouveaux mots de passe ne correspondent pas");
//         return;
//       }

//       // Appel de l'API pour modifier le mot de passe
//       try {
//         const response = await fetch(`/api/user/modifyPswrd/${userId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             newPassword: formData.newPassword, // Nouveau mot de passe
//           }),
//         });

//         if (response.ok) {
//           setSuccess(true);
//           setFormData({
//             currentPassword: "",
//             newPassword: "",
//             confirmPassword: "",
//           });
//         } else {
//           setError("Erreur lors de la modification du mot de passe");
//         }
//       } catch (e) {
//         setError(
//           "Une erreur est survenue lors de la modification du mot de passe"
//         );
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Modifier votre mot de passe</h2>

//       {error && (
//         <Alert variant="destructive" className="mb-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Erreur</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {success && (
//         <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
//           <CheckCircle2 className="h-4 w-4" />
//           <AlertTitle>Succès</AlertTitle>
//           <AlertDescription>
//             Votre mot de passe a été modifié avec succès
//           </AlertDescription>
//         </Alert>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {step === 1 && (
//           <div>
//             <label
//               className="block text-sm font-medium mb-1"
//               htmlFor="currentPassword"
//             >
//               Mot de passe actuel
//             </label>
//             <input
//               type="password"
//               id="currentPassword"
//               name="currentPassword"
//               value={formData.currentPassword}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         )}

//         {step === 2 && (
//           <>
//             <div>
//               <label
//                 className="block text-sm font-medium mb-1"
//                 htmlFor="newPassword"
//               >
//                 Nouveau mot de passe
//               </label>
//               <input
//                 type="password"
//                 id="newPassword"
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label
//                 className="block text-sm font-medium mb-1"
//                 htmlFor="confirmPassword"
//               >
//                 Confirmer le nouveau mot de passe
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           {step === 1 ? "Vérifier mot de passe" : "Modifier le mot de passe"}
//         </button>
//         <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//           Annuler l&apos;opération
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PasswordChangeForm;
"use client";
import React, { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useSession } from "next-auth/react";

const PasswordChangeForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1); // Variable pour suivre l'étape
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setStep(1);
    setError("");
    setSuccess(false);
  };

  // Gestion des modifications dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess(false);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !session.user || !session.user.id) {
      setError("Impossible de récupérer l'ID de l'utilisateur.");
      return;
    }

    const userId = session.user.id;
    console.log("ID de l'utilisateur de la session actuelle :", userId);

    if (step === 1) {
      // Étape 1 : Vérification du mot de passe actuel
      if (!formData.currentPassword) {
        setError("Le mot de passe actuel est requis");
        return;
      }

      // Appel de l'API pour vérifier si le mot de passe actuel est correct
      try {
        const response = await fetch(`/api/user/verifyPswrd/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId, // ID utilisateur
            currentPassword: formData.currentPassword, // Mot de passe actuel
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Mot de passe correspondant");
          setStep(2);
          setError("");
        } else {
          // Si le mot de passe est incorrect
          setError(data.error || "Le mot de passe actuel est incorrect");
        }
      } catch (error) {
        setError(
          "Une erreur est survenue lors de la vérification du mot de passe"
        );
        console.error(
          "Erreur lors de la vérification du mot de passe :",
          error
        );
      }
    } else if (step === 2) {
      // Étape 2 : Validation du nouveau mot de passe
      if (!formData.newPassword || !formData.confirmPassword) {
        setError("Tous les champs sont obligatoires");
        return;
      }

      if (formData.newPassword.length < 8) {
        setError("Le nouveau mot de passe doit contenir au moins 8 caractères");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("Les nouveaux mots de passe ne correspondent pas");
        return;
      }

      // Appel de l'API pour modifier le mot de passe
      try {
        const response = await fetch(`/api/user/modifyPswrd/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: formData.newPassword, // Nouveau mot de passe
          }),
        });

        if (response.ok) {
          setSuccess(true);
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setError("Erreur lors de la modification du mot de passe");
        }
      } catch (e) {
        setError(
          "Une erreur est survenue lors de la modification du mot de passe"
        );
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Modifier votre mot de passe</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Succès</AlertTitle>
          <AlertDescription>
            Votre mot de passe a été modifié avec succès
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="currentPassword"
            >
              Mot de passe actuel
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {step === 2 && (
          <>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="newPassword"
              >
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="confirmPassword"
              >
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {step === 1 ? "Vérifier mot de passe" : "Modifier le mot de passe"}
        </button>

        {step === 2 ? (
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Annuler l&apos;opération
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default PasswordChangeForm;
