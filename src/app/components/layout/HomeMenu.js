'use client'
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {

  const [top, setTop] = useState([]);

  useEffect(()=>{
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        const bestSellers = menuItems.slice(-3);
        setTop(bestSellers); 
      })
    });
  },[]);

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-24 -z-10 text-left">
          <Image src={"/moras.png"} width={120} height={100} alt="Menu" />
        </div>
        <div className="absolute right-0 -top-48 -z-10 text-left">
          <Image src={"/pina.png"} width={120} height={120} alt="Menu" />
        </div>
      </div>
      <SectionHeaders subHeader={"Check Out"} mainHeader={"Our Best Sellers"} />
      <div className="grid grid-cols-3 gap-4">
        {top?.length>0 && top.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
