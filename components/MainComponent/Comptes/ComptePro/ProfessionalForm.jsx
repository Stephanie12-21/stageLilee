import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";

export function ProfessionnalForm({ handlePreviousStep, handleNextStep }) {
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
          Etape 1 : Votre entreprise
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez renseigner votre numéro de SIRET
        </p>
      </div>

      <div className="space-y-4 ">
        <div className="space-y-2 pt-6">
          <Label
            htmlFor="siret"
            className="text-right text-[#425466] font-medium text-[17px]"
          >
            Votre SIRET
          </Label>
          <Input
            type="text"
            id="siret"
            name="siret"
            required
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
          />
        </div>

        <div className="space-y-2 pt-6">
          <Label
            htmlFor="societe-name"
            className="text-right text-[#425466] font-medium text-[17px]"
          >
            Le nom de la société
          </Label>
          <Input
            type="text"
            id="societe-name"
            name="societe-name"
            required
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
          />
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
