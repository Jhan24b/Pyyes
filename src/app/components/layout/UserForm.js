"use client";
import { useProfile } from "../useProfile";
import EditableImage from "../layout/EditableImage";
import AddressInputs from "./AddressInputs";
import { useState } from "react";

export default function UserForm({ user, onSave }) {
  const [email, setEmail] = useState(user?.email || "");
  const [userName, setUserName] = useState(user?.name || "");
  const [imageProfile, setImageProfile] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [isAdmin, setIsAdmin] = useState(user?.admin || false);
  const { isAdmin: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <>
      <div className="md:flex gap-2">
        <div>
          <div className="bg-gray-100 p-2 rounded-lg relative max-w-[120px]">
            <EditableImage link={imageProfile} setLink={setImageProfile} />
          </div>
        </div>
        <form
          className="grow"
          onSubmit={(ev) =>
            onSave(ev, {
              name: userName,
              image: imageProfile,
              phone,
              address: streetAddress,
              city,
              postalCode,
              country,
              admin: isAdmin,
            })
          }
        >
          <label>First and last name</label>
          <input
            type="text"
            value={userName}
            onChange={(ev) => {
              setUserName(ev.target.value);
            }}
            placeholder="First and last name"
          />
          <label>Email</label>
          <input type="email" disabled={true} value={email} />
          
          <AddressInputs
          addressProps={{phone, streetAddress, postalCode, city, country}}
          setAddressProp={handleAddressChange}
        />

          {loggedInUserData && (
            <div className="flex items-center justify-end gap-2 pr-2 pb-2">
              <label className="" htmlFor={"adminCb"}>
                Admin
              </label>
              <input
                id="adminCb"
                checked={isAdmin}
                value={1}
                onChange={(ev) => {
                  setIsAdmin(ev.target.checked);
                }}
                type="checkbox"
              ></input>
            </div>
          )}
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
