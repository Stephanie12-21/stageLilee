"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/MainComponent/TextEditor/RichEditor";
import AnimatedSymbol from "@/components/MainComponent/Loading/Loading";
import { is } from "date-fns/locale";

const PubliciteForm = ({ params }) => {
  const { id } = params;
  const [step, setStep] = useState(1);
  const [phoneMarque, setPhoneMarque] = useState("");
  const [nomMarque, setNomMarque] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [emailMarque, setEmailMarque] = useState("");
  const [adresseMarque, setAdresseMarque] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagramm, setInstagramm] = useState("");
  const [youtube, setYoutbe] = useState("");
  const [duree, setDuree] = useState("");
  const [logo, setLogo] = useState([]);
  const [tikTok, setTikTok] = useState("");
  const [twitter, setTwitter] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [contenuPartenaire, setcontenuPartenaire] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPartenaires() {
      try {
        const response = await fetch(`/api/partenaire/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.id) {
            console.log("Publicite trouvée, avec l'id Publicite :", id, data);
            setNomMarque(data.nom);
            setEmailMarque(data.email);
            setAdresseMarque(data.adresse);
            setPhoneMarque(data.phone);
            setSiteWeb(data.siteWeb);
            setcontenuPartenaire(data.contenuPartenaire);
            setLogo(data.logo);
            setFacebook(data.facebook);
            setLinkedIn(data.linkedin);
            setInstagramm(data.instagram);
            setYoutbe(data.youtube);
            setTikTok(data.tikTok);
            setTwitter(data.twitter);
            setDescription(data.description);
            setDuree(data.duree);
          } else {
            console.error("Publicite non trouvée, avec l'id Publicite :", id);
          }
        } else {
          console.error("Publicite non trouvée, avec l'id Publicite :", id);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la Publicite :",
          error
        );
      }
    }
    fetchPartenaires();
  }, [id]);

  const handleContenuChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setcontenuPartenaire((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Récupère le premier fichier sélectionné
    if (file) {
      setLogo([file]); // Met à jour l'état pour ne contenir qu'un seul fichier
    }
  };

  const handleRemoveContenu = (index) => {
    setcontenuPartenaire(contenuPartenaire.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statutPartenaire = "ACTIF";
    const PhoneMarque = `+${phoneMarque}`;
    const formDataToSend = new FormData();
    formDataToSend.append("nomMarque", nomMarque);
    formDataToSend.append("adresseMarque", adresseMarque);
    formDataToSend.append("emailMarque", emailMarque);
    formDataToSend.append("phoneMarque", PhoneMarque);
    formDataToSend.append("facebook", facebook);
    formDataToSend.append("siteWeb", siteWeb);
    formDataToSend.append("instagramm", instagramm);
    formDataToSend.append("twitter", twitter);
    formDataToSend.append("tikTok", tikTok);
    formDataToSend.append("linkedIn", linkedIn);
    formDataToSend.append("youtube", youtube);
    formDataToSend.append("statutPartenaire", statutPartenaire);
    formDataToSend.append("description", description);
    formDataToSend.append("duree", duree);

    contenuPartenaire.forEach((file) => {
      formDataToSend.append("contenuPartenaire", file);
    });
    logo.forEach((file) => {
      formDataToSend.append("logo", file);
    });

    try {
      const response = await fetch(`/api/partenaire/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Partenaire modifié avec succès !");
        router.push("/admin/partenaire/");
      } else {
        alert("Erreur lors de la création");
      }
    } catch (error) {
      console.error("Erreur de soumission:", error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <AnimatedSymbol />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-5 bg-white shadow-md  rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Modifier les données du partenaire
      </h2>

      {step === 1 && (
        <div className="flex-col space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="block mb-2">
                  Désignation<span className="text-red-500">*</span> :
                </label>
                <input
                  name="nomMarque"
                  value={nomMarque}
                  onChange={(e) => setNomMarque(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Nom de la marque"
                />
                {errors.nomMarque && (
                  <p className="text-red-500 text-sm">{errors.nomMarque}</p>
                )}
              </div>
              <div className="space-y-3">
                <label className="block mb-2">
                  Adresse email<span className="text-red-500">*</span> :
                </label>
                <input
                  type="email"
                  name="emailMarque"
                  value={emailMarque}
                  onChange={(e) => setEmailMarque(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="monemail@example.com"
                />
                {errors.emailMarque && (
                  <p className="text-red-500 text-sm">{errors.emailMarque}</p>
                )}
              </div>
              <div className="space-y-3">
                <label className="block mb-2">
                  Numéro de téléphone <span className="text-red-500">*</span>:
                </label>
                <PhoneInput
                  country={"fr"}
                  value={phoneMarque}
                  onChange={setPhoneMarque}
                  placeholder="Entrez votre numéro"
                  inputStyle={{ width: "100%", height: "40px" }}
                  buttonClass="custom-flag-style"
                  inputClass="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
                />
                {errors.phoneMarque && (
                  <p className="text-red-500 text-sm">{errors.phoneMarque}</p>
                )}
              </div>
              <div className="space-y-3">
                <label className="block mb-2">
                  Adresse<span className="text-red-500">*</span>:
                </label>
                <input
                  name="adresseMarque"
                  value={adresseMarque}
                  onChange={(e) => setAdresseMarque(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Paris, France"
                />
                {errors.adresseMarque && (
                  <p className="text-red-500 text-sm">{errors.adresseMarque}</p>
                )}
              </div>
              {/* <div className="space-y-3">
                <Label htmlFor="contenu">
                  Logo de la marque<span className="text-red-500">*</span> :
                </Label>
                <Input
                  type="file"
                  id="images"
                  onChange={handleImageChange}
                  accept="image/*"
                />

                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  {logo.map((file, index) => {
                    if (file instanceof File) {
                      return (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(file)}
                            width={200}
                            height={200}
                            alt="Prévisualisation de l'image"
                            className=" object-cover border border-gray-300 rounded-full"
                          />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div> */}
              <div className="space-y-3">
                <Label htmlFor="contenu">
                  Logo de la marque<span className="text-red-500">*</span> :
                </Label>
                <Input
                  type="file"
                  id="images"
                  onChange={handleImageChange}
                  accept="image/*"
                />

                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  {logo.length > 0 && logo[0] instanceof File && (
                    <div className="relative">
                      <Image
                        src={URL.createObjectURL(logo[0])} // On n'affiche que le premier fichier de l'array `logo`
                        width={200}
                        height={200}
                        alt="Prévisualisation de l'image"
                        className="object-cover border border-gray-300 rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="block mb-2">Site Web </label>
                <input
                  name="siteWeb"
                  value={siteWeb}
                  onChange={(e) => setSiteWeb(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.siteweb.com"
                />
              </div>
              <div className="space-y-3">
                <label className="block mb-2">Profil facebook </label>
                <input
                  name="siteWeb"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.facebook.com"
                />
              </div>
              <div className="space-y-3">
                <label className="block mb-2">Profil instagramm</label>
                <input
                  name="siteWeb"
                  value={instagramm}
                  onChange={(e) => setInstagramm(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.instagramm.com"
                />
              </div>
              <div className="space-y-3">
                <label className="block mb-2">Profil linkedIn </label>
                <input
                  name="siteWeb"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.linkedin.com"
                />
              </div>
              <div className="space-y-3">
                <label className="block mb-2">Profil twitter </label>
                <input
                  name="siteWeb"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.twitter.com"
                />
              </div>
              <div className="space-y-3">
                <label className="block mb-2">Profil tikTok </label>
                <input
                  name="siteWeb"
                  value={tikTok}
                  onChange={(e) => setTikTok(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.tiktok.com"
                />
              </div>
              <div className="space-y-3">
                <label className="block mb-2">Profil youtube </label>
                <input
                  name="siteWeb"
                  value={youtube}
                  onChange={(e) => setYoutbe(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.youtube.com"
                />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between w-full space-x-9">
              <Button
                onClick={() => setStep(2)}
                className=" p-2 rounded w-full  "
              >
                Prochaine étape
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-col space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="duree">
                  Durée de validité <span className="text-red-500">*</span> :
                </Label>
                <Select
                  className="w-full"
                  value={duree || ""}
                  onValueChange={(value) => setDuree(value)} // Mise à jour correcte de l'état
                >
                  <SelectTrigger className="w-full px-4">
                    <SelectValue
                      placeholder="Sélectionner la durée"
                      className="flex items-start"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MENSUEL">1 mois</SelectItem>
                      <SelectItem value="TRIMESTRIEL">3 mois</SelectItem>
                      <SelectItem value="SEMESTRIEL">6 mois</SelectItem>
                      <SelectItem value="ANNUEL">12 mois</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <label className="block mb-2">Description :</label>
                <RichTextEditor
                  className="bg-white p-2 border border-gray-300 h-screen rounded"
                  content={description}
                  onChange={(json) => setDescription(json)}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="images">Images ou vidéos publicitaires:</Label>
                <Input
                  type="file"
                  id="images"
                  onChange={handleContenuChange}
                  accept="image/*,video/*"
                  multiple
                />
                <div className="flex flex-wrap gap-4 mt-4">
                  {contenuPartenaire.map((file, index) => {
                    // Vérification que l'élément est bien un fichier (File)
                    if (file instanceof File) {
                      return (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(file)} // Créer une URL valide si c'est un fichier
                            alt={`preview-${index}`}
                            width={200}
                            height={200}
                            className="w-32 h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            onClick={() => handleRemoveContenu(index)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      );
                    } else {
                      return null; // Si ce n'est pas un fichier valide, ne rien afficher
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between w-full space-x-9">
              <Button
                onClick={() => setStep(1)}
                className="bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-500 "
              >
                Retour
              </Button>
              <Button
                onClick={handleSubmit}
                className=" text-white p-2 rounded w-full"
              >
                Modifier les données
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PubliciteForm;
