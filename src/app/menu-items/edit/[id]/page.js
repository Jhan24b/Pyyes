"use client";
import UserTabs from "@/app/components/layout/UserTabs";
import { useProfile } from "@/app/components/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import Link from "next/link";
import Left from "../../../components/icons/Left";
import { redirect, useParams } from "next/navigation";
import DeleteButton from "@/app/components/layout/DeleteButton";
// 6:52:34

export default function EditMenuItemPage() {
  const { id } = useParams();
  const { isLoading, isAdmin } = useProfile();
  const [itemEdit, setItemEdit] = useState();
  const [redirectTo, setRedirectTo] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setItemEdit(item);
      });
    });
  }, []);

  async function handleSubmitForm(ev, data) {
    ev.preventDefault();
    data._id = id;
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok)
        resolve();
      else
        reject();
    });
    await toast.promise(savingPromise, {
      loading: "Updating the dessert...",
      success: "Dessert updated",
      error: "Something went wrong...",
    });

    setRedirectTo(true);
  }

  async function handleDeleteItem() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting the dessert...",
      success: "Dessert deleted",
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
            <b> Edit Dessert</b>{" "}
          </h2>
        </div>
      </div>
      <MenuItemForm onSubmit={handleSubmitForm} menuItem={itemEdit} />
      <div className="max-w-md mx-auto mt-1">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton label={"Delete"} onDelete={() => handleDeleteItem()} />
        </div>
      </div>
    </section>
  );
}
