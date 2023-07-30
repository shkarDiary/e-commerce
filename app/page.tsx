"use client";
import Image from "next/image";
import Button from "./components/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [imageNumber, setImageNumber] = useState(1);
  const router = useRouter();
  useEffect((): any => {
    const interval = setInterval(() => {
      imageNumber === 1 ? setImageNumber(2) : setImageNumber(1);
    }, 3000);

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  });

  return (
    <div
      className="relative  w-screen h-[calc(100vh-91px)] text-center
    flex flex-col justify-center
    items-center space-y-6
    text-white "
    >
      <div className="absolute inset-0 z-[-1]">
        {imageNumber === 1 ? (
          <Image
            src={"/../public/image1.jpg"}
            alt="hero"
            fill={true}
            objectFit="cover"
          ></Image>
        ) : (
          <Image
            src={"/../public/image3.jpg"}
            alt="hero"
            fill={true}
            objectFit="cover"
          ></Image>
        )}
      </div>
      <h1>Clothing DELIVERY</h1>
      <h4>
        We know how large objects will act, but things on a <br /> small scale
        just do not act that way.
      </h4>
      <Button size="lg" color="primary" onClick={() => router.push("/shop")}>
        Start Now
      </Button>
      <div className=" absolute bottom-3 bg-white w-20 h-2 rounded-2xl opacity-50" />
      <div
        className={` absolute bottom-3 bg-white w-10 h-2 rounded-2xl ${
          imageNumber === 1 ? "translate-x-[-20px]" : "translate-x-[20px]"
        } transition-all duration-500`}
      />
      {imageNumber === 1 && (
        <FaChevronRight
          size={80}
          className="absolute right-10 hover:cursor-pointer"
          onClick={() => setImageNumber(2)}
        />
      )}
      {imageNumber === 2 && (
        <FaChevronLeft
          size={100}
          className="absolute left-10 hover:cursor-pointer"
          onClick={() => setImageNumber(1)}
        />
      )}
    </div>
  );
}
