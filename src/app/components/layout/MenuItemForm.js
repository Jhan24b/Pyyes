import EditableImage from "./EditableImage";
import MenuItemsPriceProps from "@/app/components/layout/MenuItemsPriceProps";
import { useEffect, useState } from "react";
//7:31:26

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [nameItem, setNameItem] = useState(menuItem?.name || "");
  const [descriptionItem, setItemDescription] = useState(
    menuItem?.description || ""
  );
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [imageItem, setImageItem] = useState(menuItem?.image || "");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredients, setExtraIngredients] = useState(
    menuItem?.extraIngredients || []
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((cats) => {
        setCategories(cats);
      });
    });
  }, []);

  return (
    <>
      <form
        className="mt-8 max-w-md mx-auto"
        onSubmit={(ev) =>
          onSubmit(ev, {
            image: imageItem,
            name: nameItem,
            description: descriptionItem,
            basePrice,
            sizes,
            extraIngredients,
            category,
          })
        }
      >
        <div
          className="grid gap-2 items-start"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>
            <EditableImage link={imageItem} setLink={setImageItem} />
          </div>
          <div className="grow">
            <label>Item Name</label>
            <input
              type="text"
              value={nameItem}
              onChange={(ev) => setNameItem(ev.target.value)}
            ></input>
            <label>Description</label>
            <input
              type="text"
              value={descriptionItem}
              onChange={(ev) => setItemDescription(ev.target.value)}
            ></input>
            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
            ></input>
            <label>Category</label>
            <select
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
            >
              {categories?.length > 0 &&
                categories.map((val) => (
                  <option key={val._id} value={val._id}>
                    {val.name}
                  </option>
                ))}
            </select>
            <MenuItemsPriceProps
              title={"Sizes"}
              titleButton={"Add New Size"}
              props={sizes}
              setProps={setSizes}
            />

            <MenuItemsPriceProps
              title={"Extra Ingredients"}
              titleButton={"New Extra Ingredient"}
              props={extraIngredients}
              setProps={setExtraIngredients}
            />

            <button className="border border-primary" type="submit">
              {menuItem ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
