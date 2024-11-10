import { CardCarrousel } from "./CardCarrousel";

export function Testimonial() {
  return (
    <div className="container p-8 h-fit flex-col">
      <p className="flex items-center justify-center pt-10 mb-10 text-3xl">
        Ce que disent les utilisateurs
      </p>

      <CardCarrousel />
    </div>
  );
}
