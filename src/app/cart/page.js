"use client";
import { useContext, useState, useEffect } from "react";
import { CartContext, cartProductPrice } from "../components/AppContext";
import { useProfile } from "@/app/components/useProfile";
import Image from "next/image";
import SectionHeaders from "../components/layout/SectionHeaders";
import AddressInputs from "@/app/components/layout/AddressInputs";
import Delete from "@/app/components/icons/Delete";
import CartProduct from "@/app/components/menu/CartProduct";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, address, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress: address,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }
  // return (
  //   <section className="mt-8">
  //     <div className="text-center">
  //       <SectionHeaders mainHeader={"Cart"} />
  //     </div>

  //     <div className="grid grid-cols-2 gap-2 mt-4">
  //       <div>
  //         {cartProducts?.length === 0 && (
  //           <div> Your shopping cart is empty</div>
  //         )}
  //         {cartProducts?.length > 0 &&
  //           cartProducts.map((product, idx) => (
            
  //             <div
  //               key={product._id}
  //               className="flex items-center gap-4 mb-2 border-b py-2"
  //             >{console.log("cart: ", product)}
  //               <div className="w-12">
  //                 <Image
  //                   src={product.image}
  //                   alt={product.name}
  //                   width={240}
  //                   height={240}
  //                 />
  //               </div>
  //               <div className="grow">
  //                 <h3 className="font-semibold">{product.name}</h3>
  //                 {product.size && (
  //                   <div className="text-sm text-gray-700">
  //                     Size: <span>{product.size.name}</span>
  //                   </div>
  //                 )}
  //               </div>
  //               {product.extras?.length > 0 && (
  //                 <div className="text-sm text-gray-500">
  //                   Aditionals:
  //                   {product.extras.map((extra) => (
  //                     <div key={extra._id}>
  //                       {extra.name} <b>${extra.price}</b>
  //                     </div>
  //                   ))}
  //                 </div>
  //               )}
  //               <div className="text-lg font-semibold ">
  //                 {cartProductPrice(product)}
  //               </div>
  //               <div className="ml-2">
  //                 <button
  //                   type="button"
  //                   onClick={() => removeCartProduct(idx)}
  //                   className="px-0 w-10"
  //                 >
  //                   <Delete />
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         <div className="py-4 pr-16 flex justify-end items-center">
  //           <div className="text-gray-500">
  //             Subtotal:
  //             <br />
  //             Delivery:
  //             <br />
  //             Total:
  //           </div>
  //           <div className="text-lg font-semibold pl-3">
  //             <b>$ {subtotal}</b> <br />
  //             <b>$ 5</b> <br />
  //             <b>$ {subtotal + 5}</b>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-gray-200 p-4 rounded-lg ml-4">
  //         <h2>CheckOut</h2>
  //         <form onSubmit={proceedToCheckout}>
  //           <AddressInputs
  //             addressProps={address}
  //             setAddressProp={handleAddressChange}
  //           />
  //           <button type="submit">Pay ${subtotal + 5}</button>
  //         </form>
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section className="mt-4">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-4 md:grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              index={index}
              product={product}
              onRemove={removeCartProduct}
            />
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:<br />
              Delivery:<br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subtotal}<br />
              $5<br />
              ${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${subtotal+5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
