"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      nom,
      prenom,
      email,
      phone: `+${phone}`,
      objet,
      message,
    };

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du message."
        );
      }

      alert("Message envoyé avec succès !");
      handleResetForm();
    } catch (error) {
      setError("Une erreur s'est produite lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setPhone("");
    setObjet("");
    setMessage("");
  };

  return (
    <div className="container mx-auto flex justify-center items-center  space-x-10 pt-10 pb-10">
      <Card className="w-full h-full shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl flex-grow">
        <CardHeader className="flex items-center">
          <CardTitle className="pt-2 items-center">Prenons contact</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-2">
              <div className="flex w-full space-x-2">
                <div className="w-full space-y-2">
                  <Label
                    htmlFor="nom"
                    className="text-right text-[#425466] font-medium text-[16px]"
                  >
                    Nom
                  </Label>
                  <Input
                    id="nom"
                    placeholder="Nom"
                    value={nom}
                    required
                    onChange={(e) => setNom(e.target.value)}
                    className="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
                  />
                </div>

                <div className="w-full space-y-2">
                  <Label
                    htmlFor="prenom"
                    className="text-right text-[#425466] font-medium text-[16px]"
                  >
                    Prénom
                  </Label>
                  <Input
                    id="prenom"
                    placeholder="Prénom"
                    value={prenom}
                    required
                    onChange={(e) => setPrenom(e.target.value)}
                    className="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-right text-[#425466] font-medium text-[16px]"
                >
                  Votre adresse email
                </Label>
                <Input
                  id="email"
                  placeholder="email@gmail.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="num"
                  className="text-right text-[#425466] font-medium text-[16px]"
                >
                  Votre numéro de téléphone
                </Label>
                <PhoneInput
                  country={"fr"}
                  value={phone}
                  required
                  onChange={setPhone}
                  placeholder="Entrez votre numéro"
                  inputStyle={{ width: "100%", height: "40px" }}
                  buttonClass="custom-flag-style"
                  inputClass="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label
                  htmlFor="objet"
                  className="text-[#425466] font-medium text-[16px]"
                >
                  L&apos;objet du message
                </Label>
                <Input
                  id="objet"
                  placeholder="L'objet du message"
                  value={objet}
                  required
                  onChange={(e) => setObjet(e.target.value)}
                  className="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-right text-[#425466] font-medium text-[16px]"
                >
                  Votre message
                </Label>
                <textarea
                  id="message"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message ici"
                  className="col-span-3 w-full h-32 bg-[#edf2f7] text-[15px] text-[#27272E] font-medium p-2 rounded-md"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex py-3 items-center  w-full">
            <Button
              className="bg-[#0f172a] text-white py-2  rounded-lg w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Contact;
