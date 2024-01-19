import Link from "next/link";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className=" text-gray-500 max-w-md mx-auto mt-4 flex-col gap-4 text-center">
          <p className=" mt-4">Lore Ipsum</p>
          <p className=" mt-4">Lore Ipsum</p>
          <p className=" mt-4">Lore Ipsum</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't Hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className=" mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+51999444555">
            +51 999 444 555
          </a>
        </div>
      </section>
      
    </>
  );
}
