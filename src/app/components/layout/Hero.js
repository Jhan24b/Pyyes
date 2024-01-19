import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero py-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br /> is better <br /> with a{" "}
          <span className="text-primary">Pye</span>
        </h1>
        <p className="my-6 text-gray-500">
          Pye is the missing piece that makes every day complete, a simple
          delicious joy in life
        </p>
        <div className="flex items-center justify-evenly gap-4 text-sm">
          <button className="bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
            Order Now
            <Right />
          </button>
          <button className="flex gap-2 text-gray-600 font-semibold items-center">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pyeManzana.png"}
          layout="fill"
          objectFit="contain"
          alt="Pye"
        />
      </div>
    </section>
  );
}
