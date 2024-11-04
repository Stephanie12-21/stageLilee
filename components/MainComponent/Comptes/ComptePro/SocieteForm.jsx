import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Image from "next/image";

export function SocieteForm({ handlePreviousStep, handleNextStep }) {
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
          Etape 2 : Les informations de votre entreprise
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez renseigner les informations requises
        </p>
      </div>

      <div className="space-y-1 ">
        {/* secteur d'activité et type d'entreprise*/}
        <div className="flex justify-between space-x-3">
          <div className="space-y-2 pt-6 w-full">
            <Label
              htmlFor="societe-secteur"
              className="text-right text-[#425466] font-medium text-[17px]"
            >
              Le secteur d'activité
            </Label>
            <Select className="w-full">
              <SelectTrigger className="w-full px-4">
                <SelectValue
                  placeholder="Selectionner le secteur"
                  className="flex items-start"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="immobilier">Immobilier</SelectItem>
                  <SelectItem value="vêtement">Vêtement</SelectItem>
                  <SelectItem value="emploi/recrutement">
                    Emploi / Recrutement
                  </SelectItem>
                  <SelectItem value="voiture">Voiture</SelectItem>
                  <SelectItem value="loisir">Loisir</SelectItem>
                  <SelectItem value="materiel/equipement">
                    Matériels / Equipements
                  </SelectItem>
                  <SelectItem value="mobilier">Mobilier</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 pt-6 w-full">
            <Label
              htmlFor="societe-type"
              className="text-right text-[#425466] font-medium text-[17px]"
            >
              Le type d'entreprise
            </Label>
            <Select className="w-full">
              <SelectTrigger className="w-full px-4">
                <SelectValue placeholder="Selectionner le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="entreprise-individuelle">
                    Entreprise individuelle
                  </SelectItem>
                  <SelectItem value="entreprise-collective-publique">
                    Entreprise collective publique
                  </SelectItem>
                  <SelectItem value="entreprise-colllective-privee">
                    Entreprise collective privée
                  </SelectItem>
                  <SelectItem value="association">Association</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* adresse et code postal */}
        <div className="flex justify-between space-x-3">
          <div className="space-y-2 pt-6 w-full">
            <Label
              htmlFor="societe-adresse"
              className="text-right text-[#425466] font-medium text-[17px]"
            >
              Adresse
            </Label>
            <Input
              type="text"
              id="societe-adresse"
              name="societe-adresse"
              required
              className="w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
            />
          </div>

          <div className="space-y-2 pt-6 w-full">
            <Label
              htmlFor="societe-code-postal"
              className="text-right text-[#425466] font-medium text-[17px]"
            >
              Code postal
            </Label>
            <Input
              type="text"
              id="societe-code-postal"
              name="societe-code-postal"
              required
              className="w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
            />
          </div>
        </div>

        {/* pays et ville */}
        <div className="flex justify-between space-x-3">
          <div className="space-y-2 pt-6 w-full">
            <Label
              htmlFor="societe-ville"
              className="text-right text-[#425466] font-medium text-[17px]"
            >
              Ville
            </Label>
            <Input
              type="text"
              id="societe-ville"
              name="societe-ville"
              required
              className="w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
            />
          </div>

          <div className="space-y-2 pt-6 w-full">
            <Label
              htmlFor="societe-pays"
              className="text-right text-[#425466] font-medium text-[17px]"
            >
              Pays
            </Label>
            <Input
              type="text"
              id="societe-pays"
              name="societe-pays"
              required
              className="w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
            />
          </div>
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
