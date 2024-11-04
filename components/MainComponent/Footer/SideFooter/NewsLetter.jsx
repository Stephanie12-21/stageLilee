import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
Input

const NewsLetter = () => {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <Label className='text-[22px] font-bold text-white '>Abonnez-vous à notre <span className="text-[#FCA311]">newsletter</span> pour ne rien manquer.</Label>
        <div className="flex gap-x-4">
        <Input id="userEmail" placeholder="Votre adresse email" className='font-medium text-[16px] bg-transparent text-[#FAFAFA]' />
        <Button className='rounded-[8px] text-[#15213D] font-bold px-9 text-[16px] bg-white hover:bg-white'>S'inscrire</Button>
        </div>
      </div>
    </div>
    
  )
}

export default NewsLetter