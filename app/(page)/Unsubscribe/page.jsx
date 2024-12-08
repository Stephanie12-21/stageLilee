// "use client";

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// const Unsubscribe = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");
//   useEffect(() => {
//     const handleUnsubscribe = async () => {
//       if (!token) return;

//       try {
//         const response = await fetch(
//           `/api/newsletter/unsubscribe?token=${token}`,
//           {
//             method: "GET",
//           }
//         );

//         if (response.ok) {

//           setTimeout(() => {
//             router.push("/");
//           }, 3000);
//         } else {
//           console.error("Erreur lors du désabonnement");
//         }
//       } catch (error) {
//         console.error("Erreur réseau :", error);
//       }
//     };

//     handleUnsubscribe();
//   }, [token, router]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold">Vous avez été désabonné.</h1>
//       <p className="mt-4">
//         Vous allez être redirigé vers la page d&apos;accueil.
//       </p>
//     </div>
//   );
// };

// export default Unsubscribe;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Unsubscribe = () => {
  const router = useRouter();

  useEffect(() => {
    const handleUnsubscribe = async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const token = urlSearchParams.get("token");

      if (!token) return;

      try {
        const response = await fetch(
          `/api/newsletter/unsubscribe?token=${token}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          setTimeout(() => {
            router.push("/");
          }, 3000); // Redirection après 3 secondes
        } else {
          console.error("Erreur lors du désabonnement");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    handleUnsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Vous avez été désabonné.</h1>
      <p className="mt-4">
        Vous allez être redirigé vers la page d&apos;accueil.
      </p>
    </div>
  );
};

export default Unsubscribe;
