import { CardCarrousel } from "./CardCarrousel";

export function Testimonial() {
  return (
    <div className='container mx-auto h-[500px] flex-col'>
      <p className="flex items-center justify-center pt-10 mb-10 text-[30px]">Ce que disent les utilisateurs</p>
      <div className='container mx-auto'>
        <CardCarrousel/>
      </div>

    </div>
  );
}
