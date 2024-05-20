"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

/**
 * React component for user login with email, password, or Google.
 * Handles user inputs, login state, and authentication services.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles form submission for login.
   * Attempts to log in using provided credentials.
   * Displays error message if login fails.
   * @param {Event} ev - Form submission event
   */
  async function handleSubmitForm(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    try {
      await signIn("credentials", { email, password, callbackUrl: "/" });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Failed to login. Please check your credentials.");
    }

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      {/* <form className="max-w-xs mx-auto" onSubmit={handleSubmitForm}>
        <input
          type="email"
          placeholder="Email"
          disabled={loginInProgress}
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          disabled={loginInProgress}
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </form> */}
      <div className="my-4 text-center text-gray-500">With Provider</div>
      <div className="max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => {
            setLoginInProgress(true);
            signIn("google", { callbackUrl: "/" });
            setLoginInProgress(false);
          }}
          className="flex gap-4 justify-center"
        >
          <Image
            src={"/google.png"}
            alt={"Google Logo"}
            width={24}
            height={24}
          />
          Login with Google
        </button>
      </div>

      <div className="text-center my-4 text-gray-500 border-t pt-4">
        Dont have an account?{" "}
        <Link className="underline" href={"/login"}>
          Create one &raquo;
        </Link>
      </div>
    </section>
  );
}
