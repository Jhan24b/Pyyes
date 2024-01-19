"use client";
import UserTabs from "@/app/components/layout/UserTabs";
import { useProfile } from "@/app/components/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditableImage from "../components/layout/EditableImage";
import Link from "next/link";
import Right from "../components/icons/Right";
import Image from "next/image";
// 6,48,11
//https://www.youtube.com/watch?v=9nNNmbmnNF0

export default function MenuItemsPage() {
  const { isLoading, isAdmin } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (isLoading) {
    return "Loading information...";
  }

  if (!isAdmin) {
    return "You're not and admin...!";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <Link className="button" href={"/menu-items/new"}>
          Create a New Dessert Item <Right />{" "}
        </Link>
      </div>
      <div className="">
        <h2 className="text-sm text-gray-500 mt-8">Edit dessert item: </h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image src={item.image} alt="" width={200} height={200} />
                </div>
                <div className="text-center">
                  {item.name}<br/>
                  {item.description}<br/>
                  {item.basePrice}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
