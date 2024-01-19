import Delete from "@/app/components/icons/Delete";
import ChevronDown from "@/app/components/icons/ChevronDown";
import ChevronUp from "@/app/components/icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProps({
  props,
  setProps,
  title,
  titleButton,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newProps = [...prevSizes];
      newProps[index][prop] = newValue;
      return newProps;
    });
  }

  function removeProp(index) {
    setProps((prev) => prev.filter((v, i) => i !== index));
  }

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="bg-gray-200 p-2 rounded-md mb-2">
        <button
          type="button"
          className={isOpen ? 'mb-2' : ''}
          onClick={handleToggle}
        >
          {isOpen && <ChevronUp />}
          {!isOpen && <ChevronDown />}
          <span>{title}</span>
          <span>({props.length})</span>
        </button>

        <div className={isOpen ? "" : "hidden"}>
          {props?.length > 0 &&
            props.map((size, idx) => (
              <div className="flex gap-2 items-end" key={idx}>
                <div>
                  <label>Size name</label>
                  <input
                    type="text"
                    placeholder="Size name"
                    value={size.name}
                    onChange={(ev) => editProp(ev, idx, "name")}
                  />
                </div>
                <div>
                  <label>Extra price</label>
                  <input
                    type="text"
                    placeholder="Extra price"
                    value={size.price}
                    onChange={(ev) => editProp(ev, idx, "price")}
                  />
                </div>
                <div className="pb-3">
                  <button
                    type="button"
                    className="mx-0 p-0 w-8 h-10 items-center border-none"
                    onClick={() => removeProp(idx)}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            ))}
          <button type="button" onClick={addProp} className="bg-white">
            {titleButton}
          </button>
        </div>
      </div>
    </>
  );
}
