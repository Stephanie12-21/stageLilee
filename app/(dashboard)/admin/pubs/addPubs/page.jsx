'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const formSchema = z.object({
  nomMarque: z.string().min(2, {
    message: "Le nom de la marque doit contenir au moins 2 caractères.",
  }),
  emailMarque: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phoneMarque: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, {
    message: "Veuillez entrer un numéro de téléphone français valide.",
  }),
  adresseMarque: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères.",
  }),
  siteWeb: z.string().url({
    message: "Veuillez entrer une URL valide.",
  }).optional().or(z.literal('')),
  debutPub: z.date({
    required_error: "Veuillez sélectionner une date de début.",
  }),
  finPub: z.date({
    required_error: "Veuillez sélectionner une date de fin.",
  }),
  dureePub: z.number().int().positive({
    message: "La durée doit être un nombre entier positif.",
  }),
  statutPub: z.enum(["ACTIVE", "SUSPENDUE"]),
  contenuPub: z.array(z.object({
    path: z.string().min(1, {
      message: "Le chemin du contenu ne peut pas être vide.",
    }),
  })).min(1, {
    message: "Veuillez ajouter au moins un contenu publicitaire.",
  }),
})

export function PubliciteForm() {
  const [contenuPub, setContenuPub] = useState<{ path: string }[]>([{ path: '' }])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomMarque: "",
      emailMarque: "",
      phoneMarque: "",
      adresseMarque: "",
      siteWeb: "",
      debutPub: new Date(),
      finPub: new Date(),
      dureePub: 30,
      statutPub: "ACTIVE",
      contenuPub: [{ path: '' }],
    },
  })

  

  const addContenuPub = () => {
    setContenuPub([...contenuPub, { path: '' }])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nomMarque"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la marque</FormLabel>
              <FormControl>
                <Input placeholder="Nom de la marque" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailMarque"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email de la marque</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneMarque"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone de la marque</FormLabel>
              <FormControl>
                <Input placeholder="+33123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adresseMarque"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse de la marque</FormLabel>
              <FormControl>
                <Textarea placeholder="Adresse de la marque" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="siteWeb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site web</FormLabel>
              <FormControl>
                <Input placeholder="https://www.example.com" {...field} />
              </FormControl>
              <FormDescription>Optionnel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="debutPub"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de début</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2100-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="finPub"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de fin</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2100-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dureePub"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée de la publicité (en jours)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="statutPub"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut de la publicité</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="SUSPENDUE">Suspendue</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {contenuPub.map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`contenuPub.${index}.path`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Contenu publicitaire ${index + 1}`}</FormLabel>
                <FormControl>
                  <Input placeholder="Chemin du contenu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="button" onClick={addContenuPub}>Ajouter un contenu</Button>
        <Button type="submit">Soumettre</Button>
      </form>
    </Form>
  )
}

