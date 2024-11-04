import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaArrowRight } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

function DetailAnnonces() {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="flex space-x-4">
        <TabsTrigger
          value="description"
          className="relative py-2 px-4 text-md font-medium  hover:bg-transparent hover:text-[#15213D] active:bg-transparent active:"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="avis"
          className="relative py-2 px-4 text-md font-medium  hover:bg-transparent hover:text-[#15213D] active:bg-transparent active:"
        >
          Avis
        </TabsTrigger>
        <TabsTrigger
          value="localisation"
          className="relative py-2 px-4 text-md font-medium"
        >
          Localisation
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300"></span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <Card className="border-none bg-inherit">
          <CardHeader>
            {/* description détaillée */}
            <CardTitle>Description détaillée</CardTitle>
          </CardHeader>
          <CardContent className="space-y-7">
            <div className="space-y-1">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                recusandae ullam magnam. Laudantium necessitatibus cupiditate
                asperiores distinctio reprehenderit! Non excepturi accusantium
                deserunt sunt consequuntur recusandae! Adipisci eos voluptas
                blanditiis non culpa amet fuga similique ullam accusamus ipsa
                incidunt necessitatibus nobis, facere eum ratione maxime beatae
                fugit? Aliquam, est unde quis fugiat nemo suscipit praesentium
                eius ex cupiditate aspernatur, sapiente sit dignissimos.
                Distinctio praesentium id cumque, odit optio soluta. Magnam
                doloremque quibusdam vero odio sequi temporibus debitis
                veritatis suscipit, ad exercitationem? Fugiat quam perferendis
                magnam unde dolor. Quae veritatis corrupti reprehenderit, harum
                nostrum odio dicta consectetur fuga et, itaque ducimus nam.
              </p>
            </div>

            {/* aménagement */}
            <div className="space-y-3 pt-5">
              <h2 className="text-2xl font-semibold leading-none tracking-tight">
                Caractéristiques particulières
              </h2>
              <div className="container mx-auto pt-4 grid grid-cols-2 gap-6">
                {/* <!-- Colonne Faire --> */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>
                </div>

                {/* <!-- Colonne Ne pas Faire --> */}
                <div className="space-y-3.5">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* règlements */}
            <div className="space-y-3 pt-5">
              <h2 className="text-2xl font-semibold leading-none tracking-tight">
                Règlements à respecter
              </h2>
              <div className="container mx-auto pt-4 grid grid-cols-2 gap-6">
                {/* <!-- Colonne Faire --> */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-green-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>
                </div>

                {/* <!-- Colonne Ne pas Faire --> */}
                <div className="space-y-3.5">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-2 border-red-500 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit, corrupti?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="avis">
        <Card className="border-none bg-inherit">
          <CardHeader className="space-y-4">
            <CardTitle className="text-[#23262F]">Laissez un avis</CardTitle>
            <CardDescription className="text-[#303236] text-[16px] ">
              Exprimez-vous, commentez et déposez un avis. Partagez vos
              expériences avec les autres.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="mb-6  flex justify-between items-center space-x-3">
              <input
                type="text"
                placeholder="Exprimez-vous..."
                className="border border-gray-300 p-2 w-full  rounded-lg"
              />
              <Button className="py-4 px-5 text-[17px] rounded-[10px]">
                Publier
                <FaArrowRight className="ml-2" />
              </Button>
            </div>

            <div className="flex justify-between pt-7">
              <p className="font-semibold">Nombres de commentaires</p>
              <Select>
                <SelectTrigger className="w-fit px-4">
                  <SelectValue placeholder="Selectionner les commentaires" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tous les commentaires</SelectItem>
                    <SelectItem value="newest">Les plus récents</SelectItem>
                    <SelectItem value="latest">Les plus anciens</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* liste des commentaires */}
            <div className="flex flex-col items-start">
              <div className="flex justify-between pt-8">
                <div className="flex space-x-5">
                  <div>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>Photo</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[#182135] font-bold text-[18px] hover:underline hover:cursor-default">
                      Nom d'utilisateur
                    </p>
                    <p className="text-[#353945] font-medium text-[16px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora voluptatum beatae alias eveniet, culpa doloremque
                      debitis nesciunt quo aspernatur laboriosam?Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Quam quisquam
                      illo eius id, distinctio laboriosam accusantium laudantium
                      qui officia dolore recusandae ipsum? Dolorum voluptatibus
                      in mollitia tenetur quos, tempore nobis!
                    </p>
                    <div className="flex space-x-5">
                      <p id="time" className="text-[#777E90] text-[14px]">
                        Récent
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#FCA311"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="none"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <div className="flex space-x-5">
                  <div>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>Photo</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[#182135] font-bold text-[18px] hover:underline hover:cursor-default">
                      Nom d'utilisateur
                    </p>
                    <p className="text-[#353945] font-medium text-[16px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora voluptatum beatae alias eveniet, culpa doloremque
                      debitis nesciunt quo aspernatur laboriosam?Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Quam quisquam
                      illo eius id, distinctio laboriosam accusantium laudantium
                      qui officia dolore recusandae ipsum? Dolorum voluptatibus
                      in mollitia tenetur quos, tempore nobis!
                    </p>
                    <div className="flex space-x-5">
                      <p className="text-[#777E90] text-[14px]">Ancien</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#FCA311"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="none"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <div className="flex space-x-5">
                  <div>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>Photo</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[#182135] font-bold text-[18px] hover:underline hover:cursor-default">
                      Nom d'utilisateur
                    </p>
                    <p className="text-[#353945] font-medium text-[16px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora voluptatum beatae alias eveniet, culpa doloremque
                      debitis nesciunt quo aspernatur laboriosam?Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Quam quisquam
                      illo eius id, distinctio laboriosam accusantium laudantium
                      qui officia dolore recusandae ipsum? Dolorum voluptatibus
                      in mollitia tenetur quos, tempore nobis!
                    </p>
                    <div className="flex space-x-5">
                      <p className="text-[#777E90] text-[14px]">Ancien</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#FCA311"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="none"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <div className="flex space-x-5">
                  <div>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>Photo</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[#182135] font-bold text-[18px] hover:underline hover:cursor-default">
                      Nom d'utilisateur
                    </p>
                    <p className="text-[#353945] font-medium text-[16px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora voluptatum beatae alias eveniet, culpa doloremque
                      debitis nesciunt quo aspernatur laboriosam?Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Quam quisquam
                      illo eius id, distinctio laboriosam accusantium laudantium
                      qui officia dolore recusandae ipsum? Dolorum voluptatibus
                      in mollitia tenetur quos, tempore nobis!
                    </p>
                    <div className="flex space-x-5">
                      <p className="text-[#777E90] text-[14px]">Récents</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#FCA311"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="none"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <div className="flex space-x-5">
                  <div>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>Photo</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[#182135] font-bold text-[18px] hover:underline hover:cursor-default">
                      Nom d'utilisateur
                    </p>
                    <p className="text-[#353945] font-medium text-[16px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora voluptatum beatae alias eveniet, culpa doloremque
                      debitis nesciunt quo aspernatur laboriosam?Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Quam quisquam
                      illo eius id, distinctio laboriosam accusantium laudantium
                      qui officia dolore recusandae ipsum? Dolorum voluptatibus
                      in mollitia tenetur quos, tempore nobis!
                    </p>
                    <div className="flex space-x-5">
                      <p className="text-[#777E90] text-[14px]">Ancien</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#FCA311"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="none"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="localisation">
        <div className="w-full h-[550px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.4757995109226!2d3.8222888756976987!3d43.617455054742706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6afc85016162d%3A0x196b4165c87eb3f9!2sLilee!5e0!3m2!1sfr!2smg!4v1725788916061!5m2!1sfr!2smg"
            fill
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default DetailAnnonces;
