import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function ComponentCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative">
        <Image
          src="/placeholder.svg?height=300&width=400"
          alt="Apartment"
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 text-red-500 hover:text-red-600">
          <Heart className="h-6 w-6" />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">Categories</div>
        <h2 className="text-lg font-semibold mb-1">Appartement meublé</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Montpellier, France
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-bold text-lg text-orange-500">
          50€{" "}
          <span className="text-sm font-normal text-muted-foreground">
            / nuit(s)
          </span>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Heart } from "lucide-react";
// import Image from "next/image";

// const apartments = [
//   {
//     id: 1,
//     title: "Appartement meublé",
//     location: "Montpellier, France",
//     price: 50,
//     rating: 5,
//   },
//   {
//     id: 2,
//     title: "Studio moderne",
//     location: "Paris, France",
//     price: 75,
//     rating: 4,
//   },
//   {
//     id: 3,
//     title: "Loft spacieux",
//     location: "Lyon, France",
//     price: 60,
//     rating: 5,
//   },
//   {
//     id: 4,
//     title: "Appartement vue mer",
//     location: "Nice, France",
//     price: 90,
//     rating: 4,
//   },
// ];
// function Component() {
//   return (
//     <Carousel className="w-full max-w-5xl mx-auto">
//       <CarouselContent>
//         {apartments.map((apartment) => (
//           <CarouselItem
//             key={apartment.id}
//             className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
//           >
//             <div className="p-1">
//               <Card className="w-full overflow-hidden">
//                 <div className="relative">
//                   <Image
//                     src="/placeholder.svg?height=300&width=400"
//                     alt={apartment.title}
//                     width={400}
//                     height={300}
//                     className="w-full h-48 object-cover"
//                   />
//                   <button className="absolute top-2 right-2 text-red-500 hover:text-red-600">
//                     <Heart className="h-6 w-6" />
//                   </button>
//                 </div>
//                 <CardContent className="p-4">
//                   <div className="text-sm text-muted-foreground mb-1">
//                     Categories
//                   </div>
//                   <h2 className="text-lg font-semibold mb-1">
//                     {apartment.title}
//                   </h2>
//                   <p className="text-sm text-muted-foreground mb-2">
//                     {apartment.location}
//                   </p>
//                 </CardContent>
//                 <CardFooter className="p-4 pt-0 flex justify-between items-center">
//                   <div className="font-bold text-lg text-orange-500">
//                     {apartment.price}€{" "}
//                     <span className="text-sm font-normal text-muted-foreground">
//                       / nuit(s)
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <svg
//                         key={i}
//                         className={`w-4 h-4 ${
//                           i < apartment.rating
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                   </div>
//                 </CardFooter>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }
