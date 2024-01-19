"use client";
import { useEffect, useState } from "react";
import { useProfile } from "@/app/components/useProfile";
import UserTabs from "@/app/components/layout/UserTabs";
import toast from "react-hot-toast";
import UserForm from "@/app/components/layout/UserForm";
import { useParams } from "next/navigation";

export default function EditUserPage() {
  const { loading, isAdmin } = useProfile();
  const { id } = useParams();
  const [userEdit, setUserEdit] = useState(null);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((response) => {
      response.json().then((u) => {
        setUserEdit(u);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "An error has occurred while saving the user",
    });
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!isAdmin) {
    return "You're not and admin...!";
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
      <UserTabs isAdmin={isAdmin} />
      <div className="flex justify-center pt-4">
        <h2 className="text-primary">
          <b>EDIT USER</b>
        </h2>
      </div>
      <UserForm user={userEdit} onSave={handleSaveButtonClick} />
    </section>
  );
}
