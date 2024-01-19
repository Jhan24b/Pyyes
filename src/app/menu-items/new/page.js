"use client";
import UserTabs from "@/app/components/layout/UserTabs";
import { useProfile } from "@/app/components/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from "../../components/layout/MenuItemForm";
import Link from "next/link";
import Left from "../../components/icons/Left";
import { redirect } from "next/navigation";

export default function NewMenuItemPage() {
  const { isLoading, isAdmin } = useProfile();

  const [redirectTo, setRedirectTo] = useState(false);

  async function handleSubmitForm(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving the new dessert...",
      success: "Dessert saved",
      error: "Something went wrong...",
    });

    setRedirectTo(true);
  }

  if (redirectTo) {
    return redirect("/menu-items");
  }

  if (isLoading) {
    return "Loagind data...";
  }

  if (!isAdmin) {
    return "You are not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8 flex-col">
        <Link href={"/menu-items"} className="flex items-center gap-1">
          <Left /> Go Back
        </Link>
        <div className="max-w-md mx-auto text-center mt-8">
          <h2 className="text-primary">
            <b> New Dessert</b>{" "}
          </h2>
        </div>
      </div>
      <MenuItemForm onSubmit={handleSubmitForm} />
    </section>
  );
}
