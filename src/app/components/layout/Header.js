"use client";
// import {CartContext} from "@/components/AppContext";
// import Bars2 from "@/components/icons/Bars2";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Cart from "@/app/components/icons/Cart";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session?.data?.user;
  const { cartProducts } = useContext(CartContext);
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <>
      <header className="flex items-center justify-between">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          PYYES
        </Link>
        <nav className="flex gap-8 text-gray-500 font-semibold items-center">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <nav className="flex gap-8 font-semibold items-center">
          {status === "authenticated" && (
            <>
              <Link href={"/profile"} className="whitespace-nowrap">
                Hello, {userName}
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Logout
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Register
              </Link>
            </>
          )}
          {cartProducts?.length > 0 && (
            <Link href={"/cart"} className="relative">
              <Cart />{" "}
              <span 
                className="absolute -top-[15px] -right-3 bg-primary text-white text-sm p-1 rounded-full leading-3"
              >
                {cartProducts.length}
              </span>
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
