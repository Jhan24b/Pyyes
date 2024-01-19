"use client";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import EditCat from "../components/icons/EditCat";
import { useProfile } from "../components/useProfile";
import Link from "next/link";

export default function UsersPage() {
  const [usersList, setUserList] = useState([]);
  const [userEdit, setUserEdit] = useState([]);
  const { loading, isAdmin } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUserList(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!isAdmin) {
    return "You're not and admin...!";
  }

  return (
    <section className=" max-w-xl mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-4">
        {usersList?.length > 0 &&
          usersList.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 gap-4 grow">
                <span className="text-gray-700">{user.name}</span>
                <span className="text-gray-400">{user.email}</span>
              </div>
              <Link
                href={"/users/" + user._id}
                className="button border-none px-0"
                style={{ width: "32px", padding: ".5rem 0" }}
              >
                <EditCat />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
