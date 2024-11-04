import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { ListButton, ListLink } from "./NavBar";
import { ListContacts, ListIcons } from "../TopHeader/TopHeader";

const MobileNavBar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="text-white font-bold" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-around items-center ">
        <ListIcons />
        <ListContacts />
        <ListLink />
        <ListButton />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
