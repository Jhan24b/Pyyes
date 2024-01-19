"use client";
import UserTabs from "@/app/components/layout/UserTabs";
import DeleteCat from "@/app/components/icons/DeleteCat";
import EditCat from "@/app/components/icons/EditCat";
import { useProfile } from "@/app/components/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from '@/app/components/layout/DeleteButton';
//82227

export default function CategoriesPage() {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const { isLoading, isAdmin } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  if (isLoading) {
    return "Loading information...";
  }

  if (!isAdmin) {
    return "You're not and admin...!";
  }

  async function handleNewCategory(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: newCategoryName };
      if (editCategory) {
        data._id = editCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setNewCategoryName("");
      setEditCategory(null);
      fetchCategories();
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: editCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editCategory ? "Category updated" : "Category created",
      error: "Something went wrong, try later",
    });
  }

  async function handleDeleteCategory(_id) {
    const deletePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletePromise, {
      loading: "Deleting...",
      success: "Category deleted",
      error: "Something went wrong, try later",
    });

    fetchCategories();
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <form className="mt-8" onSubmit={handleNewCategory}>
        <div className="flex gap-1 items-end">
          <div className="grow">
            <label>
              {editCategory ? "Update category: " : "New Category name"}
              {editCategory && (
                <>
                  <b>{editCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(ev) => setNewCategoryName(ev.target.value)}
            ></input>
          </div>
          <div className="pb-2 flex gap-1">
            <button className="border border-primary" type="submit">
              {editCategory ? "Update" : "Create"}
            </button>
            {editCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditCategory("");
                  setNewCategoryName("");
                }}
                className="px-4 text-gray-700 font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </form>
      <div>
        <div className={editCategory ? "pb-2" : ""}>
          <div className="flex items-end">
            <h2 className="mt-8 text-sm to-gray-500 grow">
              Existing categories
            </h2>
          </div>
        </div>

        {categories?.length > 0 &&
          categories.map((c, idx) => (
            <div
              className="bg-gray-100 rounded-lg p-2 px-4 mb-2 flex gap-1 justify-between items-center"
              key={idx}
            >
              <span>{c.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditCategory(c);
                    setNewCategoryName(c.name);
                  }}
                  type="button"
                  className="border-none p-2"
                >
                  <EditCat />
                </button>
                {/* <button
                  onClick={() => {
                    handleDeleteCategory(c._id);
                  }}
                  type="button"
                  className="border-none p-2"
                >
                  <DeleteCat />
                </button> */}
                <DeleteButton label="Delete" onDelete={()=>handleDeleteCategory(c._id)}/>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
