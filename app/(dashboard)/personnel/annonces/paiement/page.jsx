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
