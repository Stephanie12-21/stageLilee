"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { SHEET_SIDES } from "./constants";

import { PersonnalForm } from "./ComptePerso/PersonnalForm";
import { ProfessionnalForm } from "./ComptePro/ProfessionalForm";
import { EmailVerification } from "./ComptePerso/EmailVerification";
import { PhoneForm } from "./ComptePerso/PhoneForm";
import { PhoneVerification } from "./ComptePerso/PhoneVerification";
import { PasswordForm } from "./ComptePerso/Password";
import { AuthForm } from "./AuthForms";
import { SignUpForm } from "./SignupForm";
import { SocieteForm } from "./ComptePro/SocieteForm";
import { AdminForm } from "./ComptePro/AdminForm";
import { EmailProVerification } from "./ComptePro/EmailProVerification";
import { PhonePro } from "./ComptePro/PhonePro";
import { PhoneProVerification } from "./ComptePro/PhoneProVerification";
import { PasswordProForm } from "./ComptePro/PasswordPro";
import { PasswordRecoveryForm } from "./PasswordRecovery";
import { NewPasswordForm } from "./NewPasswordForm";
import { PictureProfilePro } from "./ComptePro/PictureProfilePro";
import { PictureProfile } from "./ComptePerso/PictureProfile";

export function Connexion() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  // pour compte personnel
  const [showPersonnalForm, setShowPersonnalForm] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPictureForm, setShowPictureForm] = useState(false);

  // pour compte professionnel
  const [showProfessionnalForm, setShowProfessionnalForm] = useState(false);
  const [showSocieteForm, setShowSocieteForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showEmailProVerificationForm, setShowEmailProVerificationForm] =
    useState(false);
  const [showPhonePro, setShowPhonePro] = useState(false);
  const [showPhoneProVerification, setShowPhoneProVerification] =
    useState(false);
  const [showPasswordProForm, setShowPasswordProForm] = useState(false);
  const [showPictureProForm, setShowPictureProForm] = useState(false);

  // pour le mot de passe oublié
  const [showPasswordRecoveryForm, setShowPasswordRecoveryForm] =
    useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  const handlePasswordRecovery = (formType) => {
    if (formType === "passwordrecovery") {
      setShowPasswordRecoveryForm(true);
      setShowLogin(false);
    } else if (formType === "newpassword") {
      setShowNewPasswordForm(true);
      setShowPasswordRecoveryForm(false);
    } else {
      setShowPasswordRecoveryForm(true);
    }
  };

  const handleNextStep = (formType) => {
    if (formType === "personnel") {
      setShowPersonnalForm(true);
      setShowSignup(false);
    } else if (formType === "emailVerification") {
      setShowEmailVerification(true);
      setShowPersonnalForm(false);
    } else if (formType === "phoneform") {
      setShowPhoneForm(true);
      setShowEmailVerification(false);
    } else if (formType === "phoneVerification") {
      setShowPhoneVerification(true);
      setShowPhoneForm(false);
    } else if (formType === "professionnel") {
      setShowProfessionnalForm(true);
      setShowSignup(false);
    } else if (formType === "password") {
      setShowPasswordForm(true);
      setShowPhoneVerification(false);
    } else if (formType === "photo") {
      setShowPictureForm(true);
      setShowPasswordForm(false);
    } else if (formType === "infosociete") {
      setShowSocieteForm(true);
      setShowProfessionnalForm(false);
    } else if (formType === "adminform") {
      setShowAdminForm(true);
      setShowSocieteForm(false);
    } else if (formType === "emailproverification") {
      setShowEmailProVerificationForm(true);
      setShowAdminForm(false);
    } else if (formType === "phonepro") {
      setShowPhonePro(true);
      setShowEmailProVerificationForm(false);
    } else if (formType === "phoneproverification") {
      setShowPhoneProVerification(true);
      setShowPhonePro(false);
    } else if (formType === "passwordpro") {
      setShowPasswordProForm(true);
      setShowPhoneProVerification(false);
    } else if (formType === "photopro") {
      setShowPictureProForm(true);
      setShowPasswordProForm(false);
    } else {
      setShowLogin(false);
      setShowSignup(true);
    }
  };

  const handlePreviousStep = () => {
    if (showPhoneVerification) {
      setShowPhoneVerification(false);
      setShowPhoneForm(true);
    } else if (showPhoneForm) {
      setShowPhoneForm(false);
      setShowEmailVerification(true);
    } else if (showEmailVerification) {
      setShowEmailVerification(false);
      setShowPersonnalForm(true);
    } else if (showProfessionnalForm) {
      setShowProfessionnalForm(false);
      setShowSignup(true);
    } else if (showPasswordForm) {
      setShowPasswordForm(false);
      setShowPhoneVerification(true);
    } else if (showPictureForm) {
      setShowPictureForm(false);
      setShowPasswordForm(true);
    } else if (showPersonnalForm) {
      setShowPersonnalForm(false);
      setShowSignup(true);
    } else if (showSocieteForm) {
      setShowSocieteForm(false);
      setShowProfessionnalForm(true);
    } else if (showAdminForm) {
      setShowAdminForm(false);
      setShowSocieteForm(true);
    } else if (showEmailProVerificationForm) {
      setShowEmailProVerificationForm(false);
      setShowAdminForm(true);
    } else if (showPhonePro) {
      setShowPhonePro(false);
      setShowEmailProVerificationForm(true);
    } else if (showPhoneProVerification) {
      setShowPhoneProVerification(false);
      setShowPhonePro(true);
    } else if (showPasswordProForm) {
      setShowPasswordForm(false);
      setShowPhoneProVerification(true);
    } else if (showPictureProForm) {
      setShowPictureProForm(false);
      setShowPasswordProForm(true);
    } else {
      setShowLogin(true);
    }
  };

  // pour le compte perso
  const handleResendCode = () => {
    setShowEmailVerification(false);
    setTimeout(() => {
      setShowEmailVerification(true);
    }, 0);
  };

  const handleResendPhoneCode = () => {
    setShowPhoneVerification(false);
    setTimeout(() => {
      setShowPhoneVerification(true);
    }, 0);
  };

  // pour le compte pro
  const handleResendProCode = () => {
    setShowEmailProVerificationForm(false);
    setTimeout(() => {
      setShowEmailProVerificationForm(true);
    }, 0);
  };

  const handleResendPhoneProCode = () => {
    setShowPhoneProVerification(false);
    setTimeout(() => {
      setShowPhoneProVerification(true);
    }, 0);
  };

  return (
    <div className="flex w-full h-full">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button className="px-5 rounded-[10px] text-[16px] font-semibold bg-transparent border-[1px] hover:border">
              Se connecter
            </Button>
          </SheetTrigger>
          <SheetContent side={side} className="w-full h-[100%]">
            <div className="flex w-full h-full">
              <div className="w-[40%] h-full flex flex-col items-center justify-center">
                <Image
                  src="/assets/people.png"
                  width={900}
                  height={900}
                  alt="couverture"
                />
              </div>
              <div className="w-[60%] h-full flex justify-center items-center px-8">
                {showLogin ? (
                  <AuthForm
                    handleNextStep={handleNextStep}
                    setShowLogin={setShowLogin}
                    handlePasswordRecovery={() =>
                      handlePasswordRecovery("passwordrecovery")
                    }
                  />
                ) : showPasswordRecoveryForm ? (
                  <PasswordRecoveryForm
                    handlePreviousStep={handlePreviousStep}
                    handlePasswordRecovery={() =>
                      handlePasswordRecovery("newpassword")
                    }
                  />
                ) : showNewPasswordForm ? (
                  <NewPasswordForm
                    handlePreviousStep={handlePasswordRecovery}
                    handleNextStep={handleNextStep}
                  />
                ) : showPersonnalForm ? (
                  <PersonnalForm
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={() => handleNextStep("emailVerification")}
                  />
                ) : showEmailVerification ? (
                  <EmailVerification
                    handlePreviousStep={handlePreviousStep}
                    handleResendCode={handleResendCode}
                    handleNextStep={() => handleNextStep("phoneform")}
                  />
                ) : showPhoneForm ? (
                  <PhoneForm
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={() => handleNextStep("phoneVerification")}
                  />
                ) : showPhoneVerification ? (
                  <PhoneVerification
                    handlePreviousStep={handlePreviousStep}
                    handleResendPhoneCode={handleResendPhoneCode}
                    handleNextStep={() => handleNextStep("password")}
                  />
                ) : showPasswordForm ? (
                  <PasswordForm
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={() => handleNextStep("photo")}
                  />
                ) : showProfessionnalForm ? (
                  <ProfessionnalForm
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={() => handleNextStep("infosociete")}
                  />
                ) : showSocieteForm ? (
                  <SocieteForm
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={() => handleNextStep("adminform")}
                  />
                ) : showAdminForm ? (
                  <AdminForm
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={() =>
                      handleNextStep("emailproverification")
                    }
                  />
                ) : showEmailProVerificationForm ? (
                  <EmailProVerification
                    handlePreviousStep={handlePreviousStep}
                    handleResendProCode={handleResendProCode}
                    handleNextStep={() => handleNextStep("phonepro")}
                  />
                ) : showPhonePro ? (
                  <PhonePro
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={() =>
                      handleNextStep("phoneproverification")
                    }
                  />
                ) : showPhoneProVerification ? (
                  <PhoneProVerification
                    handlePreviousStep={handlePreviousStep}
                    handleResendPhoneProCode={handleResendPhoneProCode}
                    handleNextStep={() => handleNextStep("passwordpro")}
                  />
                ) : showPasswordProForm ? (
                  <PasswordProForm
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={() => handleNextStep("photopro")}
                  />
                ) : showPictureProForm ? (
                  <PictureProfilePro
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={handleNextStep}
                  />
                ) : showPictureForm ? (
                  <PictureProfile
                    handlePreviousStep={handlePreviousStep}
                    handleNextStep={handleNextStep}
                  />
                ) : (
                  <SignUpForm
                    handleNextStep={handleNextStep}
                    setShowLogin={setShowLogin}
                  />
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
