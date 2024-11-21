"use client";
import Image from "next/image";
import styles from "./scroll.module.css";

const Sponsors = () => {
  return (
    <div className="container mx-auto py-5 ">
      <p className="flex items-center justify-center pt-5 mb-10 text-[30px]">
        Ils nous soutiennent
      </p>

      <div className={`overflow-hidden relative w-full h-[150px]`}>
        <div className={`flex gap-16 ${styles.animateScroll}`}>
          <Image
            src="/sponsors/logo(1).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(2).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(3).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(4).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(5).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(6).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(7).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(8).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(9).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(10).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />

          <Image
            src="/sponsors/logo(1).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(2).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(3).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(4).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(5).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(6).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(7).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(8).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(9).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
          <Image
            src="/sponsors/logo(10).svg"
            width={200}
            height={150}
            alt="Sponsor Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
