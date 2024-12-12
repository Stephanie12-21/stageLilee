"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PubliciteForm = () => {
  const [phoneMarque, setPhoneMarque] = useState("");
  const [nomMarque, setNomMarque] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [emailMarque, setEmailMarque] = useState("");
  const [adresseMarque, setAdresseMarque] = useState("");
  const [DebutPub, setDebutPub] = useState("");
  const [FinPub, setFinPub] = useState("");
  const [errors, setErrors] = useState({});
  const [contenuPub, setContenuPub] = useState([]);
  const router = useRouter();

  const fetchPubData = async (id) => {
    try {
      const response = await fetch(`/api/pub/${id}`);
      if (!response.ok) {
        throw new Error("Annonce non trouvée");
      }
      const data = await response.json();
      console.log("données reçues :", data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce:", error);
      throw error;
    }
  };

  const handleContenuChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setContenuPub((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleRemoveContenu = (index) => {
    setContenuPub(contenuPub.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const statutPub = "ACTIVE";
    const PhoneMarque = `+${phoneMarque}`;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nomMarque", nomMarque);
      formDataToSend.append("adresseMarque", adresseMarque);
      formDataToSend.append("emailMarque", emailMarque);
      formDataToSend.append("siteWeb", siteWeb);
      formDataToSend.append("phoneMarque", PhoneMarque);
      formDataToSend.append("debutPub", DebutPub);
      formDataToSend.append("finPub", FinPub);
      formDataToSend.append("statutPub", statutPub);

      contenuPub.forEach((file) => {
        formDataToSend.append("contenuPub", file);
      });

      const response = await fetch("/api/pub", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Publicité créée avec succès !");
        router.push("/admin/pubs/");
        setNomMarque("");
        setEmailMarque("");
        setPhoneMarque("");
        setAdresseMarque("");
        setSiteWeb("");
        setDebutPub("");
        setFinPub("");
        setContenuPub([]);
      } else {
        alert("Erreur lors Zde la création");
      }
    } catch (error) {
      console.error("Erreur de soumission:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md my-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Création de Publicité
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Nom de la Marque</label>
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
          <div>
            <label className="block mb-2">Email de la Marque</label>
            <input
              type="email"
              name="emailMarque"
              value={emailMarque}
              onChange={(e) => setEmailMarque(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Email de contact"
            />
            {errors.emailMarque && (
              <p className="text-red-500 text-sm">{errors.emailMarque}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Téléphone</label>
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
          <div>
            <label className="block mb-2">Adresse</label>
            <input
              name="adresseMarque"
              value={adresseMarque}
              onChange={(e) => setAdresseMarque(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Adresse complète"
            />
            {errors.adresseMarque && (
              <p className="text-red-500 text-sm">{errors.adresseMarque}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Site Web (Optionnel)</label>
            <input
              name="siteWeb"
              value={siteWeb}
              onChange={(e) => setSiteWeb(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="https://www.exemple.com"
            />
            {errors.siteWeb && (
              <p className="text-red-500 text-sm">{errors.siteWeb}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Début de la Publicité</label>
            <input
              type="date"
              name="debutPub"
              value={DebutPub}
              onChange={(e) => setDebutPub(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.debutPub && (
              <p className="text-red-500 text-sm">{errors.debutPub}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Fin de la Publicité</label>
            <input
              type="date"
              name="finPub"
              value={FinPub}
              onChange={(e) => setFinPub(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.finPub && (
              <p className="text-red-500 text-sm">{errors.finPub}</p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="images">Contenus publicitaires:</Label>
            <Input
              type="file"
              id="images"
              onChange={handleContenuChange}
              accept="image/*,video/*"
              multiple
            />
            <div className="flex flex-wrap gap-4 mt-4">
              {contenuPub.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(image)}
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
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Créer la Publicité
        </button>
      </div>
    </div>
  );
};

export default PubliciteForm;
