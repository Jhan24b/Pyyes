"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setcreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setcreatingUser(true);
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });
    setcreatingUser(false);
    setUserCreated(true);
  }

  return (
    <section className="mt-8" onSubmit={handleFormSubmit}>
      <h1 className="text-center text-primary text-4xl mb-4 ">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User Created. <br /> Now you can{" "}
          <Link className="underline " href="/login">
            {" "}
            Login &raquo;{" "}
          </Link>
        </div>
      )}
      <form className="block max-w-xs mx-auto">
        {/* <input
          type="email"
          placeholder="email"
          disabled={creatingUser}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          disabled={creatingUser}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button> */}
        <div className="my-4 text-center text-gray-500">
          With Provider
        </div>
        <button type="button" onClick={() =>{signIn('google', {callbackUrl:'/'})}} className="flex gap-4 justify-center">
          <Image
            src={"/google.png"}
            alt={"Logo google"}
            width={24}
            height={24}
          />
          Register with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
