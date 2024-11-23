"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Progress } from "@/components/ui/progress";
import { MapPin, FileText, ImagePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Alert } from "@/components/ui/alert";
import RichTextEditor from "@/components/MainComponent/TextEditor/RichEditor";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function Component() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    titre: "",
    categorie: "",
    sousCategorie: "",
    adresse: "",
    localisation: "",
    description: "",
    images: null,
  });
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [description, setDescription] = useState({});
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [localisation, setLocalisation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const sousCategoriesMap = {
    IMMOBILIER: [
      "Appartements",
      "Camping",
      "Chambres d'hôtes",
      "Hôtel",
      "Logements insolites",
      "Maison",
    ],
    VETEMENT: ["Femme", "Homme", "Enfant"],
    VOITURE: ["Équipée d'une rampe", "Conduite adaptée"],
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setLocalisation("");
    setAdresse("");
    setImages([]);
    setIframeSrc("");
    setErrors({});
  };

  const handleLocalisationChange = (e) => {
    const value = e.target.value;
    setLocalisation(value);
    const regex = /https:\/\/www\.google\.com\/maps\/embed\?pb=([^&]+)/;
    const match = value.match(regex);

    if (match) {
      setIframeSrc(value);
      setErrors((prevErrors) => ({ ...prevErrors, localisation: undefined }));
    } else {
      setIframeSrc("");
      setErrors((prevErrors) => ({
        ...prevErrors,
        localisation: "Veuillez entrer un lien valide d'iframe Google Maps.",
      }));
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length > 10) {
      setIsAlertOpen(true);
      return;
    }

    if (
      !title ||
      !description ||
      !category ||
      !subcategory ||
      !localisation ||
      !adresse ||
      images.length === 0
    ) {
      alert(
        "Tous les champs doivent être remplis et au moins une image doit être uploadée."
      );
      return;
    }
    const statut = "DESACTIVEE";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", JSON.stringify(description));
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("adresse", adresse);
    formData.append("localisation", localisation);
    formData.append("statut", statut);
    formData.append("userId", session?.user.id);

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      const response = await fetch("/api/annonce/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'annonce");
      }

      const result = await response.json();
      toast.success("Annonce ajoutée avec succès !");
      router.push(`/personnel/annonces/`);
      resetForm();
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Une erreur est survenue lors de l'ajout de l'annonce.");
    }
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handlePayRedirect = async () => {
    try {
      setIsProcessing(true);

      // Appel à votre API Next.js pour créer la session de paiement
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const session = await response.json();

      // Rediriger l'utilisateur vers Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error("Erreur lors de la redirection vers Stripe:", error);
      setIsProcessing(false);
      alert("Une erreur est survenue lors du processus de paiement.");
    }
  };

  const hasPredefinedSousCategories =
    sousCategoriesMap[formData.categorie] !== undefined;
  const sousCategories = sousCategoriesMap[formData.categorie] || [];

  const steps = [
    { icon: FileText, title: "Informations" },
    { icon: MapPin, title: "Localisation" },
    { icon: FileText, title: "Description" },
    { icon: ImagePlus, title: "Images" },
  ];

  if (status === "loading") {
    return <div>Chargement...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="space-y-6 pb-8">
          <CardTitle className="text-2xl font-bold text-center">
            Ajouter une Annonce
            <div>
              <h1 className="font-bold text-3xl">
                Ajouter une Annonce par l&apos;utilisateur:{""}{" "}
                {session?.user.nom} <br />
                avec l&apos;ID:{""} {session?.user.id}
              </h1>
            </div>
          </CardTitle>

          <div className="space-y-4">
            <Progress value={(step / 4) * 100} className="w-full h-2" />

            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center space-y-2 ${
                    i + 1 === step ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      i + 1 === step ? "bg-primary/10" : "bg-gray-100"
                    }`}
                  >
                    <s.icon
                      className={`w-5 h-5 ${
                        i + 1 === step ? "text-primary" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className={`space-y-6 transition-all duration-300 ${
                step === 1 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="space-y-2">
                <Label htmlFor="titre" className="text-sm font-medium">
                  Titre de l&apos;annonce
                </Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  error={errors.title}
                />
                {errors.title && <Alert variant="error">{errors.title}</Alert>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="categorie" className="text-sm font-medium">
                  Catégorie
                </Label>
                <Select
                  name="categorie"
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IMMOBILIER">Immobilier</SelectItem>
                    <SelectItem value="VETEMENT">Vêtements</SelectItem>
                    <SelectItem value="EMPLOI">
                      Emplois / Recrutement
                    </SelectItem>
                    <SelectItem value="SERVICE">Services</SelectItem>
                    <SelectItem value="VOITURE">Voitures</SelectItem>
                    <SelectItem value="LOISIR">Loisir</SelectItem>
                    <SelectItem value="MATERIEL">
                      Matériels / Equipements
                    </SelectItem>
                    <SelectItem value="MOBILIER">Mobilier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sousCategorie" className="text-sm font-medium">
                  Sous-catégorie
                </Label>
                {hasPredefinedSousCategories ? (
                  <Select
                    name="sousCategorie"
                    value={subcategory}
                    onValueChange={(value) => setSubCategory(value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionnez une sous-catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {sousCategories.map((subcategory, index) => (
                        <SelectItem key={index} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="sousCategorie"
                    name="sousCategorie"
                    value={subcategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="h-12"
                    placeholder="Entrez une sous-catégorie"
                    required
                  />
                )}
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-300 ${
                step === 2 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="space-y-2">
                <Label htmlFor="adresse" className="text-sm font-medium">
                  Adresse complète
                </Label>
                <Input
                  type="text"
                  id="adresse"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                  error={errors.adresse}
                />
                {errors.adresse && (
                  <Alert variant="error">{errors.adresse}</Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="localisation" className="text-sm font-medium">
                  Localisation par google map
                </Label>
                <Input
                  type="text"
                  id="localisation"
                  value={localisation}
                  onChange={handleLocalisationChange}
                  required
                  error={errors.localisation}
                />
                {errors.localisation && (
                  <Alert variant="error">{errors.localisation}</Alert>
                )}
                {/* Affichage de l'iframe Google Maps */}
                {iframeSrc && (
                  <iframe
                    src={iframeSrc}
                    width="650"
                    height="500"
                    style={{ border: "0", marginTop: "10px" }}
                    allowFullScreen
                    loading="lazy"
                    title="Localisation"
                    className="items-center px-5 justify-center"
                  />
                )}
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-300 ${
                step === 3 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description détaillée
                </Label>
                <RichTextEditor
                  content={description}
                  onChange={(json) => setDescription(json)} // L'éditeur retourne maintenant un objet JSON
                />
                {errors.description && (
                  <Alert variant="error">{errors.description}</Alert>
                )}
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-300 ${
                step === 4 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              {/* <div className="space-y-4">
                <Label htmlFor="images" className="text-sm font-medium">
                  Images
                </Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Input
                    type="file"
                    id="images"
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                  />
                  <div className="flex space-x-4 mt-4">
                    {images.map((image, index) => (
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
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Label htmlFor="images" className="cursor-pointer">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600">
                      Cliquez pour ajouter des images
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PNG, JPG jusqu&apos;à 10MB
                    </span>
                  </Label>
                </div>
              </div> */}
              <div className="space-y-6">
                <Label
                  htmlFor="images"
                  className="text-lg font-semibold text-gray-700"
                >
                  {" "}
                  Images{" "}
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                  <Input
                    type="file"
                    id="images"
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <div className="flex justify-center space-x-6 mt-6">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          width={200}
                          height={200}
                          className="w-40 h-40 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 group-hover:block hidden"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Label
                    htmlFor="images"
                    className="cursor-pointer mt-4 flex flex-col items-center text-center"
                  >
                    <ImagePlus className="mx-auto h-14 w-14 text-gray-400 transition-all duration-200 hover:text-gray-600" />
                    <span className="mt-2 text-sm font-medium text-gray-600">
                      {" "}
                      Cliquez pour ajouter des images{" "}
                    </span>
                    <span className="mt-1 text-xs text-gray-500">
                      {" "}
                      PNG, JPG jusqu&apos;à 10MB{" "}
                    </span>
                  </Label>
                </div>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between pt-6">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline" className="w-32">
              Précédent
            </Button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <Button onClick={handleNext} className="w-32">
              Suivant
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="w-32">
              Publier
            </Button>
          )}
        </CardFooter>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      {/* <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limite d&apos;images dépassée</AlertDialogTitle>
            <AlertDialogDescription>
              Vous avez sélectionné {images.length} image(s). La limite est de
              10 images. Voulez-vous payer pour ajouter plus d&apos;images ?
              <div className="space-y-2">
                <p>Nombre total de photos : {images.length}</p>
                <p>Photos gratuites : 10</p>
                <p>
                  Photos payantes :{" "}
                  {images.length > 10 ? images.length - 10 : 0}
                </p>
                <p className="font-bold">
                  Coût supplémentaire : {Math.max(0, images.length - 10)} €
                </p>

                <p>Montant hors taxe : {montantHorsTaxe.toFixed(2)} €</p>
                <p>TVA (20%) : {montantTVA.toFixed(2)} €</p>
                <p className="font-bold">
                  Montant total TTC : {montantTTC.toFixed(2)} €
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsAlertOpen(false)} variant="outline">
              Annuler
            </Button>
            <Button onClick={handlePayRedirect} className="ml-2">
              Payer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limite d&apos;images dépassée</AlertDialogTitle>
            <AlertDialogDescription>
              Vous avez sélectionné {images.length} image(s). La limite est de
              10 images. Voulez-vous payer pour ajouter plus d&apos;images ?
              <div className="space-y-2">
                <p>Nombre total de photos : {images.length}</p>
                <p>Photos gratuites : 10</p>
                <p>
                  Photos payantes :{" "}
                  {images.length > 10 ? images.length - 10 : 0}
                </p>
                <p className="font-bold">
                  Coût supplémentaire : {Math.max(0, images.length - 10)} €
                </p>
                {/* Calcul des montants */}
                <p>
                  Montant hors taxe :{" "}
                  {Math.max(0, images.length - 10) * (1.0).toFixed(2)} €
                </p>{" "}
                {/* 1.00 est le coût par photo supplémentaire */}
                <p>
                  TVA (20%) :{" "}
                  {(Math.max(0, images.length - 10) * 1.0 * 0.2).toFixed(2)} €
                </p>
                <p className="font-bold">
                  Montant total TTC :{" "}
                  {(
                    Math.max(0, images.length - 10) * 1.0 +
                    Math.max(0, images.length - 10) * 1.0 * 0.2
                  ).toFixed(2)}{" "}
                  €
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsAlertOpen(false)} variant="outline">
              Annuler
            </Button>
            <Button onClick={handlePayRedirect} className="ml-2">
              Payer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
