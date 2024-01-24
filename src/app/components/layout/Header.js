"use client";
// import {CartContext} from "@/components/AppContext";
// import Bars2 from "@/components/icons/Bars2";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Cart from "@/app/components/icons/Cart";
import Menu from "@/app/components/icons/Menu";

function AuthOptions({ status, userName }) {
  return (
    <>
      {status === "authenticated" && (
        <div className="flex items-center gap-4">
          <Link href={"/profile"} className="whitespace-nowrap grow mr-16 md:mr-0">
            Hello, <b>{userName}</b>
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-primary rounded-full text-white p-2 md:px-8 md:py-2"
          >
            Logout
          </button>
        </div>
      )}
      {status === "unauthenticated" && (
        <>
          <div className="gap-4 flex items-center justify-center">
            <Link href="/login" className="px-8 md:px-2">Login</Link>
            <Link
              href="/register"
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Register
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session?.data?.user;
  const { cartProducts } = useContext(CartContext);
  const [navOpen, setNavOpen] = useState(false);
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <>
      <header>
        {console.log(session)}
        <div className="flex md:hidden justify-between">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            PYYES
          </Link>
          <div className="flex gap-4 items-center ">
            {cartProducts?.length > 0 && (
              <Link href={"/cart"} className="relative">
                <Cart />
                <span className="absolute -top-[15px] -right-3 bg-primary text-white text-sm p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              </Link>
            )}
            <button
              onClick={() => {
                setNavOpen(!navOpen);
              }}
              className="p-1 border-none"
            >
              <Menu />
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-4">
            <AuthOptions status={status} userName={userName} />
            <nav className="flex gap-4 text-gray-500 font-semibold items-center flex-col">
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/#about">About</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
          </div>
        )}

        <div className="hidden md:flex items-center justify-between">
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
            <AuthOptions status={status} userName={userName} />
            {cartProducts?.length > 0 && (
              <Link href={"/cart"} className="relative">
                <Cart />{" "}
                <span className="absolute -top-[15px] -right-3 bg-primary text-white text-sm p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
