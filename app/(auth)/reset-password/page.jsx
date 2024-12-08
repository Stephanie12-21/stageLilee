// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { Button } from "@/components/ui/button";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff } from "lucide-react";
// import Image from "next/image";

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isTokenValid, setIsTokenValid] = useState(false);
//   const [userId, setUserId] = useState("");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   useEffect(() => {
//     const verifyToken = async () => {
//       if (!token) return;

//       try {
//         const response = await fetch("/api/user/verifToken/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ token }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setIsTokenValid(true);
//           setUserId(data.userId);
//         } else {
//           setError(
//             data.error ||
//               "Le lien de réinitialisation est invalide ou a expiré."
//           );
//         }
//       } catch (err) {
//         setError("Erreur lors de la vérification du lien de réinitialisation.");
//       }
//     };

//     verifyToken();
//   }, [token]);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (password !== confirmPassword) {
//       setError("Les mots de passe ne correspondent pas.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/user/resetPswrd/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setSuccess("Votre mot de passe a été réinitialisé avec succès.");
//         router.push("/login");
//       } else {
//         setError(
//           data.message ||
//             "Une erreur est survenue lors de la réinitialisation du mot de passe."
//         );
//       }
//     } catch (err) {
//       setError("Erreur lors de la réinitialisation du mot de passe.");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible((prev) => !prev);
//   };

//   const handleCancelResetPassword = () => {
//     router.push("/login");
//   };

//   return (
//     <div className="w-full h-screen lg:grid lg:grid-cols-2">
//       <Image
//         src="/assets/logo.svg"
//         width="200"
//         height="100"
//         alt="Logo Lilee"
//         className="absolute top-4 left-40 max-md:left-8 h-[70px]"
//       />

//       <div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {isTokenValid && (
//           <div className="flex items-center justify-center min-h-screen">
//             {success && <p style={{ color: "green" }}>{success}</p>}
//             <div className="w-full max-w-fit p-10">
//               <h1 className="text-2xl font-bold max-md:text-start">
//                 Réinitialiser le mot de passe
//               </h1>

//               <div className="grid gap-4 h-full  mt-8 w-[400px]">
//                 <div className="space-y-6 relative pt-4">
//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="password"
//                       className="text-right font-medium text-[16px]"
//                     >
//                       Votre nouveau mot de passe
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="password"
//                         type={isPasswordVisible ? "text" : "password"}
//                         placeholder="*******"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="bg-white p-2 border border-gray-300 rounded"
//                         required
//                       />
//                       <div
//                         className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
//                         onClick={togglePasswordVisibility}
//                       >
//                         {isPasswordVisible ? (
//                           <Eye className="w-5 h-5 text-gray-600" />
//                         ) : (
//                           <EyeOff className="w-5 h-5 text-gray-600" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="confirmpassword"
//                       className="text-right font-medium text-[16px]"
//                     >
//                       Confirmer votre nouveau mot de passe
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="confirmpassword"
//                         type={isPasswordVisible ? "text" : "password"}
//                         placeholder="*******"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="bg-white p-2 border border-gray-300 rounded"
//                         required
//                       />
//                       <div
//                         className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
//                         onClick={togglePasswordVisibility}
//                       >
//                         {isPasswordVisible ? (
//                           <Eye className="w-5 h-5 text-gray-600" />
//                         ) : (
//                           <EyeOff className="w-5 h-5 text-gray-600" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col items-center pt-8 justify-center gap-3">
//                 <Button onClick={handleResetPassword} className="w-full">
//                   Réinitialiser le mot de passe
//                 </Button>
//                 <Button
//                   onClick={handleCancelResetPassword}
//                   variant="secondary"
//                   className="w-full border border-slate-900 hover:bg-slate-900 hover:text-white"
//                 >
//                   Annuler l&apos;opération
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="block max-lg:hidden bg-muted overflow-hidden">
//         <Image
//           src="/assets/marcus-aurelius.jpg"
//           alt="Image"
//           width="1920"
//           height="1080"
//           className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userId, setUserId] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchTokenAndVerify = async () => {
      // Extraire le token depuis l'URL
      const urlSearchParams = new URLSearchParams(window.location.search);
      const token = urlSearchParams.get("token"); // Déclaré localement dans l'effet

      if (!token) return;

      try {
        const response = await fetch("/api/user/verifToken/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.ok) {
          setIsTokenValid(true);
          setUserId(data.userId);
        } else {
          setError(
            data.error ||
              "Le lien de réinitialisation est invalide ou a expiré."
          );
        }
      } catch (err) {
        setError("Erreur lors de la vérification du lien de réinitialisation.");
      }
    };

    fetchTokenAndVerify();
  }, []); // Pas de dépendances nécessaires

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`/api/user/resetPswrd/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Votre mot de passe a été réinitialisé avec succès.");
        router.push("/login");
      } else {
        setError(
          data.message ||
            "Une erreur est survenue lors de la réinitialisation du mot de passe."
        );
      }
    } catch (err) {
      setError("Erreur lors de la réinitialisation du mot de passe.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleCancelResetPassword = () => {
    router.push("/login");
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <Image
        src="/assets/logo.svg"
        width="200"
        height="100"
        alt="Logo Lilee"
        className="absolute top-4 left-40 max-md:left-8 h-[70px]"
      />

      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isTokenValid && (
          <div className="flex items-center justify-center min-h-screen">
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className="w-full max-w-fit p-10">
              <h1 className="text-2xl font-bold max-md:text-start">
                Réinitialiser le mot de passe
              </h1>

              <div className="grid gap-4 h-full  mt-8 w-[400px]">
                <div className="space-y-6 relative pt-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-right font-medium text-[16px]"
                    >
                      Votre nouveau mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white p-2 border border-gray-300 rounded"
                        required
                      />
                      <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <Eye className="w-5 h-5 text-gray-600" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmpassword"
                      className="text-right font-medium text-[16px]"
                    >
                      Confirmer votre nouveau mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmpassword"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="*******"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-white p-2 border border-gray-300 rounded"
                        required
                      />
                      <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <Eye className="w-5 h-5 text-gray-600" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center pt-8 justify-center gap-3">
                <Button onClick={handleResetPassword} className="w-full">
                  Réinitialiser le mot de passe
                </Button>
                <Button
                  onClick={handleCancelResetPassword}
                  variant="secondary"
                  className="w-full border border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Annuler l&apos;opération
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="block max-lg:hidden bg-muted overflow-hidden">
        <Image
          src="/assets/marcus-aurelius.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
