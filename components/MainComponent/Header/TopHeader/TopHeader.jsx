import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const TopHeader = () => {
  return (
    <div className="container mx-auto pt-3">
      <div className="justify-between items-center flex">
        <ListContacts />
        <ListIcons />
      </div>
    </div>
  );
};

export function ListContacts() {
  const dataContacts = [
    {
      name: "Lilee",
      url: "https://maps.app.goo.gl/cHCgfdiczhJN6CQW9",
      img: "/icons/icons(1).svg",
    },
    {
      name: "06.50.37.68.37",
      url: "06.50.37.68.37",
      img: "/icons/icons(8).svg",
    },
    {
      name: "contact@lilee.fr",
      url: "contact@lilee.fr",
      img: "/icons/icons(7).svg",
    },
  ];
  return (
    <div className="items-center gap-10 flex">
      {dataContacts.map((i, index) => (
        <Link
          key={index}
          href={i.url}
          className="inline-flex space-x-2 items-center"
        >
          <Image src={i.img} width={24} height={24} />
          <span className="text-[16px] text-white font-extralight">
            {i.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export const ListIcons = () => {
  const dataIcons = [
    {
      url: "https://www.facebook.com/lileelogementspmr?locale=fr_FR",
      img: "/icons/icons(6).svg",
    },
    {
      url: "https://www.youtube.com/@lileepmr",
      img: "/icons/icons(3).svg",
    },
    {
      url: "https://www.linkedin.com/company/86267153/admin/",
      img: "/icons/icons(2).svg",
    },
    {
      url: "https://www.instagram.com/lilee.fr/",
      img: "/icons/icons(4).svg",
    },
  ];
  return (
    <div className="flex justify-between items-center gap-x-10">
      {dataIcons.map((i, index) => (
        <Link href={i.url}>
          <Image src={i.img} width={22} height={22} />
        </Link>
      ))}
    </div>
  );
};

export default TopHeader;
