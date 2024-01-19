import Image from "next/image";
import AddCartButton from "./AddCartButton";

export default function MenuItemTile({ onAddToCart, ...menuItem }) {
  const { image, name, description, basePrice, sizes, extraIngredients } =
    menuItem;
  const hasSizeorExtras = sizes?.length > 0 || extraIngredients?.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <Image
        width={300}
        height={250}
          src={image}
          className="block mx-auto"
          alt={name}
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddCartButton
        hasSizeorExtras={hasSizeorExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}
