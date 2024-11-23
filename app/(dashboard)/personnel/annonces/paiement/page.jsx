// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// export default function Component() {
//   const [step, setStep] = useState(1);
//   const [phone, setPhone] = useState("");
//   const [nom, setNom] = useState("");
//   const [prenom, setPrenom] = useState("");
//   const [email, setEmail] = useState("");
//   const [pays, setPays] = useState("");
//   const [ville, setVille] = useState("");
//   const [region, setRegion] = useState("");
//   const [adresse, setAdresse] = useState("");
//   const [codePostal, setCodePostal] = useState("");
//   const countries = [
//     "Afghanistan",
//     "Albanie",
//     "Algérie",
//     "Andorre",
//     "Angola",
//     "Antigua-et-Barbuda",
//     "Argentine",
//     "Arménie",
//     "Australie",
//     "Autriche",
//     "Azerbaïdjan",
//     "Bahamas",
//     "Bahreïn",
//     "Bangladesh",
//     "Barbade",
//     "Belgique",
//     "Belize",
//     "Bénin",
//     "Bhoutan",
//     "Biélorussie",
//     "Bolivie",
//     "Bosnie-Herzégovine",
//     "Botswana",
//     "Brésil",
//     "Brunei",
//     "Bulgarie",
//     "Burkina Faso",
//     "Burundi",
//     "Cabo Verde",
//     "Cambodge",
//     "Cameroun",
//     "Canada",
//     "Chili",
//     "Chine",
//     "Chypre",
//     "Colombie",
//     "Comores",
//     "Congo (RDC)",
//     "Congo (RC)",
//     "Corée du Nord",
//     "Corée du Sud",
//     "Costa Rica",
//     "Côte d'Ivoire",
//     "Croatie",
//     "Cuba",
//     "Danemark",
//     "Djibouti",
//     "Dominique",
//     "Égypte",
//     "Émirats arabes unis",
//     "Équateur",
//     "Érythrée",
//     "Espagne",
//     "Eswatini",
//     "Estonie",
//     "États-Unis",
//     "Éthiopie",
//     "Fidji",
//     "Finlande",
//     "France",
//     "Gabon",
//     "Gambie",
//     "Géorgie",
//     "Ghana",
//     "Grèce",
//     "Grenade",
//     "Guatemala",
//     "Guinée",
//     "Guinée-Bissau",
//     "Guinée équatoriale",
//     "Guyana",
//     "Haïti",
//     "Honduras",
//     "Hongrie",
//     "Inde",
//     "Indonésie",
//     "Irak",
//     "Iran",
//     "Irlande",
//     "Islande",
//     "Israël",
//     "Italie",
//     "Jamaïque",
//     "Japon",
//     "Jordanie",
//     "Kazakhstan",
//     "Kenya",
//     "Kirghizistan",
//     "Kiribati",
//     "Kosovo",
//     "Koweït",
//     "Laos",
//     "Lesotho",
//     "Lettonie",
//     "Liban",
//     "Liberia",
//     "Libye",
//     "Liechtenstein",
//     "Lituanie",
//     "Luxembourg",
//     "Madagascar",
//     "Malaisie",
//     "Malawi",
//     "Maldives",
//     "Mali",
//     "Malte",
//     "Maroc",
//     "Marshall",
//     "Maurice",
//     "Mauritanie",
//     "Mexique",
//     "Micronésie",
//     "Moldavie",
//     "Monaco",
//     "Mongolie",
//     "Monténégro",
//     "Mozambique",
//     "Myanmar (Birmanie)",
//     "Namibie",
//     "Nauru",
//     "Népal",
//     "Nicaragua",
//     "Niger",
//     "Nigéria",
//     "Norvège",
//     "Nouvelle-Zélande",
//     "Oman",
//     "Ouganda",
//     "Ouzbékistan",
//     "Pakistan",
//     "Palaos",
//     "Palestine",
//     "Panama",
//     "Papouasie-Nouvelle-Guinée",
//     "Paraguay",
//     "Pays-Bas",
//     "Pérou",
//     "Philippines",
//     "Pologne",
//     "Portugal",
//     "Qatar",
//     "République centrafricaine",
//     "République dominicaine",
//     "République tchèque",
//     "Roumanie",
//     "Royaume-Uni",
//     "Russie",
//     "Rwanda",
//     "Saint-Kitts-et-Nevis",
//     "Saint-Marin",
//     "Saint-Vincent-et-les-Grenadines",
//     "Sainte-Lucie",
//     "Salvador",
//     "Samoa",
//     "São Tomé-et-Principe",
//     "Sénégal",
//     "Serbie",
//     "Seychelles",
//     "Sierra Leone",
//     "Singapour",
//     "Slovaquie",
//     "Slovénie",
//     "Somalie",
//     "Soudan",
//     "Soudan du Sud",
//     "Sri Lanka",
//     "Suède",
//     "Suisse",
//     "Suriname",
//     "Syrie",
//     "Tadjikistan",
//     "Tanzanie",
//     "Tchad",
//     "Thaïlande",
//     "Timor oriental",
//     "Togo",
//     "Tonga",
//     "Trinité-et-Tobago",
//     "Tunisie",
//     "Turkménistan",
//     "Turquie",
//     "Tuvalu",
//     "Ukraine",
//     "Uruguay",
//     "Vanuatu",
//     "Vatican",
//     "Venezuela",
//     "Vietnam",
//     "Yémen",
//     "Zambie",
//     "Zimbabwe",
//   ];

//   const months = [
//     "Janvier",
//     "Février",
//     "Mars",
//     "Avril",
//     "Mai",
//     "Juin",
//     "Juillet",
//     "Août",
//     "Septembre",
//     "Octobre",
//     "Novembre",
//     "Décembre",
//   ];

//   const years = Array.from({ length: 8 }, (_, i) => (2023 + i).toString());

//   const proceedToPayment = () => {
//     setStep(2);
//   };

//   const pageVariants = {
//     initial: { opacity: 0, x: "-100%" },
//     in: { opacity: 1, x: 0 },
//     out: { opacity: 0, x: "100%" },
//   };

//   const pageTransition = {
//     type: "tween",
//     ease: "anticipate",
//     duration: 0.5,
//   };

//   const handleSubmitPayment = () => {
//     const Phone = `+${phone}`;
//     const data = {
//       nom,
//       prenom,
//       email,
//       Phone,
//       pays,
//       ville,
//       region,
//       adresse,
//       codePostal,

//       nameOnCard: document.getElementById("nameOnCard").value,
//       cardNumber: document.getElementById("cardNumber").value,
//       cvc: document.getElementById("cvc").value,
//       expiryMonth: document.getElementById("expiryMonth")?.innerText,
//       expiryYear: document.getElementById("expiryYear")?.innerText,
//     };
//     console.log("Données de paiement :", data);
//   };

//   return (
//     <div className="container flex justify-center items-center overflow-y-auto">
//       <Card className="w-full max-w-2xl m-10 bg-white shadow-xl rounded-xl overflow-hidden">
//         <CardContent className="p-8">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={step}
//               initial="initial"
//               animate="in"
//               exit="out"
//               variants={pageVariants}
//               transition={pageTransition}
//             >
//               {step === 1 && (
//                 <>
//                   <CardHeader className="px-0 pt-0">
//                     <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
//                       Informations personnelles
//                     </CardTitle>
//                   </CardHeader>
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       proceedToPayment();
//                     }}
//                     className="space-y-6"
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <Label
//                           htmlFor="firstName"
//                           className="text-right text-[#425466] font-medium text-[16px]"
//                         >
//                           Noms
//                         </Label>
//                         <Input
//                           id="firstName"
//                           name="firstName"
//                           placeholder="John"
//                           value={nom}
//                           onChange={(e) => setNom(e.target.value)}
//                           required
//                           className="mt-1"
//                         />
//                       </div>
//                       <div>
//                         <Label
//                           htmlFor="lastName"
//                           className="text-right text-[#425466] font-medium text-[16px]"
//                         >
//                           Prénoms
//                         </Label>
//                         <Input
//                           id="lastName"
//                           name="lastName"
//                           placeholder="Doe"
//                           value={prenom}
//                           onChange={(e) => setPrenom(e.target.value)}
//                           required
//                           className="mt-1"
//                         />
//                       </div>
//                     </div>

//                     {/* email */}
//                     <div>
//                       <Label
//                         htmlFor="email"
//                         className="text-right text-[#425466] font-medium text-[16px]"
//                       >
//                         Email
//                       </Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         placeholder="john.doe@example.com"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="mt-1"
//                       />
//                     </div>

//                     {/* numéro de téléphone */}
//                     <div>
//                       <Label
//                         htmlFor="phone"
//                         className="text-right text-[#425466] font-medium text-[16px]"
//                       >
//                         Numéro de téléphone
//                       </Label>
//                       <PhoneInput
//                         country={"fr"}
//                         value={phone}
//                         required
//                         onChange={setPhone}
//                         placeholder="Entrez votre numéro"
//                         inputStyle={{ width: "100%", height: "40px" }}
//                         buttonClass="custom-flag-style"
//                         inputClass="col-span-3 items-start w-full text-base bg-[#edf2f7]  text-[#27272E] font-medium"
//                       />
//                     </div>

//                     {/* pays */}
//                     <div>
//                       <Label
//                         htmlFor="pays"
//                         className="text-right text-[#425466] font-medium text-[16px]"
//                       >
//                         Pays
//                       </Label>
//                       <Select onValueChange={setPays} value={pays}>
//                         <SelectTrigger id="pays" className="w-full mt-1">
//                           <SelectValue placeholder="Selectionner un pays" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {countries.map((country) => (
//                             <SelectItem key={country} value={country}>
//                               {country}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     {/* ville et région */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <Label
//                           htmlFor="billingCity"
//                           className="text-right text-[#425466] font-medium text-[16px]"
//                         >
//                           Ville
//                         </Label>
//                         <Input
//                           id="billingCity"
//                           name="billingCity"
//                           placeholder="Montpellier"
//                           value={ville}
//                           onChange={(e) => setVille(e.target.value)}
//                           required
//                           className="mt-1"
//                         />
//                       </div>
//                       <div>
//                         <Label
//                           htmlFor="billingRegion"
//                           className="text-right text-[#425466] font-medium text-[16px]"
//                         >
//                           Région
//                         </Label>
//                         <Input
//                           id="billingRegion"
//                           name="billingRegion"
//                           placeholder="Occitanie"
//                           value={region}
//                           onChange={(e) => setRegion(e.target.value)}
//                           required
//                           className="mt-1"
//                         />
//                       </div>
//                     </div>

//                     {/* adresse et code postal */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <Label
//                           htmlFor="billingAdress"
//                           className="text-right text-[#425466] font-medium text-[16px]"
//                         >
//                           Adresse
//                         </Label>
//                         <Input
//                           id="billingAdress"
//                           name="billingAdress"
//                           placeholder="84 rue Maurice Béjart"
//                           value={adresse}
//                           onChange={(e) => setAdresse(e.target.value)}
//                           required
//                           className="mt-1"
//                         />
//                       </div>
//                       <div>
//                         <Label
//                           htmlFor="billingCodePostal"
//                           className="text-right text-[#425466] font-medium text-[16px]"
//                         >
//                           Code postal
//                         </Label>
//                         <Input
//                           id="billingCodePostal"
//                           name="billingCodePostal"
//                           placeholder="34080"
//                           value={codePostal}
//                           onChange={(e) => setCodePostal(e.target.value)}
//                           required
//                           className="mt-1"
//                         />
//                       </div>
//                     </div>

//                     {/* boutons */}
//                     <div className="flex justify-end pt-6">
//                       <Button onClick={proceedToPayment}>
//                         Procéder au paiement
//                       </Button>
//                     </div>
//                   </form>
//                 </>
//               )}
//               {step === 2 && (
//                 <>
//                   <CardHeader className="px-0 pt-0">
//                     <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
//                       Informations de la carte de crédit
//                     </CardTitle>
//                   </CardHeader>

//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       handleSubmitPayment();
//                     }}
//                     className="space-y-6"
//                   >
//                     {/* nom de carte de crédit */}
//                     <div>
//                       <Label
//                         htmlFor="nameOnCard"
//                         className="text-start text-[#425466] font-medium text-[16px]"
//                       >
//                         Nom et prénom
//                       </Label>
//                       <Input
//                         id="nameOnCard"
//                         placeholder="Nom et prénom marqués sur la carte de crédit"
//                         required
//                         className="mt-1"
//                       />
//                     </div>

//                     {/* numéro de carte de crédit et cvc  */}
//                     <div className="space-y-2">
//                       <div className="flex w-full space-x-2">
//                         {/* Champ du numéro de carte */}
//                         <div className="relative w-[70%]">
//                           <Label
//                             htmlFor="cardNumber"
//                             className="text-start text-[#425466] font-medium text-[16px]"
//                           >
//                             Numéro de la carte de crédit
//                           </Label>
//                           <Input
//                             id="cardNumber"
//                             placeholder="1234 5678 9012 3456"
//                             required
//                             className="mt-1 pr-12"
//                           />
//                           <div className="absolute right-3 top-8 flex items-center gap-2">
//                             <Image
//                               src="/assets/visa.svg"
//                               alt="Visa"
//                               width={32}
//                               height={20}
//                             />
//                             <Image
//                               src="/assets/mastercard.svg"
//                               alt="MasterCard"
//                               width={32}
//                               height={20}
//                             />
//                             <Image
//                               src="/assets/discover.svg"
//                               alt="Discover"
//                               width={32}
//                               height={20}
//                             />
//                           </div>
//                         </div>

//                         {/* Champ CVC */}
//                         <div className="w-[30%]">
//                           <Label
//                             htmlFor="cvc"
//                             className="text-start text-[#425466] font-medium text-[16px]"
//                           >
//                             CVC
//                           </Label>
//                           <Input
//                             id="cvc"
//                             type="text"
//                             maxLength={4}
//                             placeholder="1234"
//                             required
//                             className="mt-1"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* date expiration */}
//                     <div className="space-y-2">
//                       <Label
//                         htmlFor="expiryDate"
//                         className="text-start text-[#425466] font-medium text-[16px]"
//                       >
//                         Date d&apos;expiration
//                       </Label>
//                       <div className="flex w-full space-x-2">
//                         <div className="flex w-full space-x-2">
//                           <div className="w-full">
//                             <Select>
//                               <SelectTrigger id="expiryMonth">
//                                 <SelectValue placeholder="Mois" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {months.map((month) => (
//                                   <SelectItem key={month} value={month}>
//                                     {month}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <div className="w-full">
//                             <Select>
//                               <SelectTrigger id="expiryYear">
//                                 <SelectValue placeholder="Année" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {years.map((year) => (
//                                   <SelectItem key={year} value={year}>
//                                     {year}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-6">
//                       <Label className="font-semibold text-xl text-[#425466] underline">
//                         Informations de facturation :
//                       </Label>
//                       <p>
//                         Nom:{" "}
//                         <span className="font-bold">{`${nom} ${prenom}`}</span>
//                       </p>
//                       <p>
//                         Email: <span className="font-bold">{email}</span>
//                       </p>
//                       <p>
//                         Téléphone: <span className="font-bold">{phone}</span>
//                       </p>
//                       <p>
//                         Pays: <span className="font-bold">{pays}</span>
//                       </p>
//                       <p>
//                         Ville: <span className="font-bold">{ville}</span>
//                       </p>
//                       <p>
//                         Adresse: <span className="font-bold">{codePostal}</span>
//                       </p>
//                       <p>
//                         Code postal:{" "}
//                         <span className="font-bold"> {codePostal}</span>
//                       </p>
//                     </div>

//                     {/* boutons */}
//                     <div className="flex justify-between pt-6">
//                       <Button
//                         variant="outline"
//                         className="border border-primary"
//                         onClick={() => setStep(1)}
//                       >
//                         Retour
//                       </Button>
//                       <Button type="submit">Confirmer le paiement</Button>
//                     </div>
//                   </form>
//                 </>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const countries = [
//   "France",
//   "États-Unis",
//   "Canada",
//   "Allemagne",
//   "Royaume-Uni", // Simplifié
// ];

// const months = [
//   "Janvier",
//   "Février",
//   "Mars",
//   "Avril",
//   "Mai",
//   "Juin",
//   "Juillet",
//   "Août",
//   "Septembre",
//   "Octobre",
//   "Novembre",
//   "Décembre",
// ];

// const years = Array.from({ length: 8 }, (_, i) => (2023 + i).toString());

// export default function Component() {
//   const [step, setStep] = useState(1);

//   // États pour les champs du formulaire
//   const [phone, setPhone] = useState("");
//   const [nom, setNom] = useState("");
//   const [prenom, setPrenom] = useState("");
//   const [email, setEmail] = useState("");
//   const [pays, setPays] = useState("");
//   const [ville, setVille] = useState("");
//   const [region, setRegion] = useState("");
//   const [adresse, setAdresse] = useState("");
//   const [codePostal, setCodePostal] = useState("");

//   const proceedToPayment = () => {
//     if (
//       nom &&
//       prenom &&
//       email &&
//       phone &&
//       pays &&
//       ville &&
//       adresse &&
//       codePostal
//     ) {
//       setStep(2); // Passe au step 2 uniquement si tous les champs sont remplis
//     } else {
//       alert("Veuillez remplir tous les champs obligatoires.");
//     }
//   };

//   const handleSubmitPayment = () => {
//     alert("Paiement confirmé !");
//   };

//   const pageVariants = {
//     initial: { opacity: 0, x: "-100%" },
//     in: { opacity: 1, x: 0 },
//     out: { opacity: 0, x: "100%" },
//   };

//   const pageTransition = {
//     type: "tween",
//     ease: "anticipate",
//     duration: 0.5,
//   };

//   return (
//     <div className="container flex justify-center items-center overflow-y-auto">
//       <Card className="w-full max-w-2xl m-10 bg-white shadow-xl rounded-xl overflow-hidden">
//         <CardContent className="p-8">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={step}
//               initial="initial"
//               animate="in"
//               exit="out"
//               variants={pageVariants}
//               transition={pageTransition}
//             >
//               {step === 1 && (
//                 <>
//                   <CardHeader className="px-0 pt-0">
//                     <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
//                       Informations personnelles
//                     </CardTitle>
//                   </CardHeader>
//                   <form className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <Label htmlFor="firstName">Nom</Label>
//                         <Input
//                           id="firstName"
//                           value={nom}
//                           onChange={(e) => setNom(e.target.value)}
//                           required
//                           placeholder="John"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="lastName">Prénom</Label>
//                         <Input
//                           id="lastName"
//                           value={prenom}
//                           onChange={(e) => setPrenom(e.target.value)}
//                           required
//                           placeholder="Doe"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         placeholder="john.doe@example.com"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="phone">Numéro de téléphone</Label>
//                       <PhoneInput
//                         country="fr"
//                         value={phone}
//                         onChange={setPhone}
//                         placeholder="Entrez votre numéro"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="pays">Pays</Label>
//                       <Select onValueChange={setPays} value={pays}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Sélectionner un pays" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {countries.map((country) => (
//                             <SelectItem key={country} value={country}>
//                               {country}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <Label htmlFor="city">Ville</Label>
//                         <Input
//                           id="city"
//                           value={ville}
//                           onChange={(e) => setVille(e.target.value)}
//                           required
//                           placeholder="Paris"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="region">Région</Label>
//                         <Input
//                           id="region"
//                           value={region}
//                           onChange={(e) => setRegion(e.target.value)}
//                           required
//                           placeholder="Île-de-France"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <Label htmlFor="address">Adresse</Label>
//                         <Input
//                           id="address"
//                           value={adresse}
//                           onChange={(e) => setAdresse(e.target.value)}
//                           required
//                           placeholder="84 rue Maurice Béjart"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="zip">Code postal</Label>
//                         <Input
//                           id="zip"
//                           value={codePostal}
//                           onChange={(e) => setCodePostal(e.target.value)}
//                           required
//                           placeholder="75000"
//                         />
//                       </div>
//                     </div>
//                     <div className="flex justify-end pt-6">
//                       <Button onClick={proceedToPayment}>
//                         Procéder au paiement
//                       </Button>
//                     </div>
//                   </form>
//                 </>
//               )}
//               {step === 2 && (
//                 <>
//                   <CardHeader>
//                     <CardTitle>Informations de paiement</CardTitle>
//                   </CardHeader>
//                   <form>
//                     {/* Détails de la carte */}
//                     <Button onClick={handleSubmitPayment}>Confirmer</Button>
//                   </form>
//                 </>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PagePaiement = () => {
  const nombrePhotos = 20;
  const photosGratuites = 10;
  const coutParPhotoSupplementaire = 1;
  const photosPayantes = Math.max(0, nombrePhotos - photosGratuites);
  const coutTotal = photosPayantes * coutParPhotoSupplementaire;

  const tauxTVA = 0.2;
  const montantHorsTaxe = coutTotal;
  const montantTVA = montantHorsTaxe * tauxTVA;
  const montantTTC = montantHorsTaxe + montantTVA;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Page de Paiement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information importante</AlertTitle>
          <AlertDescription>
            Au-delà de 10 photos ajoutées, vous devez payer 1 euro pour chaque
            image supplémentaire.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <p>Nombre total de photos : {nombrePhotos}</p>
          <p>Photos gratuites : {photosGratuites}</p>
          <p>Photos payantes : {photosPayantes}</p>
          <p className="font-bold">Coût supplémentaire : {coutTotal} €</p>
          <p>Montant hors taxe : {montantHorsTaxe.toFixed(2)} €</p>
          <p>TVA (20%) : {montantTVA.toFixed(2)} €</p>
          <p className="font-bold">
            Montant total TTC : {montantTTC.toFixed(2)} €
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Procéder au paiement de {montantTTC.toFixed(2)} €
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PagePaiement;

