import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";
import Image from "next/image";

export function PhoneProVerification({
  handlePreviousStep,
  handleResendPhoneProCode,
  handleNextStep,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-size-sm w-[70%] h-fit p-8 container mx-auto pt-2 bg-white rounded-[24px] shadow-lg"
    >
      <div className="flex items-center justify-center">
        <Image src="/assets/logo.svg" width={200} height={200} alt="logo" />
      </div>

      <div className="flex items-start flex-col gap-2 pt-1">
        <h2 className="text-[#15213d] text-2xl font-bold underline">
          Etape 6 : Vérification du numéro de téléphone
        </h2>
        <p className="text-[#15213d] font-medium">
          Nous avons envoyé un code de vérification à votre numéro de téléphone,
          veuillez le saisir ici.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center pt-5">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex items-center justify-center pt-4 space-x-3">
          <p>Aucun code reçu?</p>
          <Button
            type="button"
            className="text-[#182135] text-[17px] bg-transparent hover:bg-transparent font-semibold hover:underline"
            onClick={handleResendPhoneProCode}
          >
            Renvoyer le code
          </Button>
        </div>

        <div className="flex flex-col space-y-4 pt-5">
          <Button
            type="button"
            className="w-full px-5 py-2 text-[#2563eb] bg-inherit text-[17px] border border-[#2563eb] rounded-md hover:bg-blue-700 hover:text-white"
            onClick={handlePreviousStep}
          >
            Retour
          </Button>
          <Button
            type="button"
            className="w-full px-5 py-2 bg-blue-600 text-white text-[17px] rounded-md hover:bg-blue-700"
            onClick={handleNextStep}
          >
            Suivant
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
