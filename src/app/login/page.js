"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setloginInProgress] = useState(false);

    async function handleSubmitForm(ev){
        ev.preventDefault();
        setloginInProgress(true);
        await signIn('credentials',{email,password, callbackUrl:'/'});
        setloginInProgress(false);
    }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4 ">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleSubmitForm}>
        <input
          type="email"
          placeholder="email"
          disabled={loginInProgress}
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          disabled={loginInProgress}
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button disabled={loginInProgress} type="submit" >Login</button>
        <div className="my-4 text-center text-gray-500">
          Or Login With Provider
        </div>
        <button type="button" onClick={() =>{signIn('google', {callbackUrl:'/'})}} className="flex gap-4 justify-center">
          <Image
            src={"/google.png"}
            alt={"Logo google"}
            width={24}
            height={24}
          />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Dont have an account?{" "}
          <Link className="underline" href={"/login"}>
            Create one &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
