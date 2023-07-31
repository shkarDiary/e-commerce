"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pacifico } from "next/font/google";
import { BsFillPersonFill } from "react-icons/bs";
import { useUser } from "../context/user";
import { AiOutlineShoppingCart } from "react-icons/ai";
import jwtDecode from "jwt-decode";
import { useCart } from "../context/cart";

const pacifico = Pacifico({ subsets: ["cyrillic"], weight: ["400"] });

export default function Navbar() {
  const { user } = useUser();
  const { cartItems } = useCart();

  const [items, setItems] = useState(0);
  const [name, setName] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (user.token) {
      setIsLogged(true);
      console.log(jwtDecode(user.token));
      setName(jwtDecode(user.token).name);
    } else {
      setIsLogged(false);
    }
    console.log(isLogged);
  }, [user]);

  useEffect(() => {
    setItems(cartItems.length);
    console.log(items);
  }, [cartItems]);

  const pathName = usePathname();
  console.log(pathName);

  return (
    <nav
      className="flex justify-around
     pt-[16px] lg:pr-[143px] md:pr-[50px] pb-[17px] lg:pl-[136px] md:pl-[40px] lg:gap-[41px] md:gap-[11px] border-b h-[91px] items-center shadow"
    >
      <div
        className={
          " lg:mx-10 md:mx-5 lg:text-2xl md:text-xl text-secondText" +
          " " +
          pacifico.className
        }
      >
        Shkar
      </div>
      <ul className="flex lg:space-x-4 md:space-x-2 text-sm font-bold">
        <Link href={"/"} className={pathName === "/" ? "text-secondText" : ""}>
          Home
        </Link>
        <Link
          href={"/shop"}
          className={pathName === "/shop" ? "text-secondText" : ""}
        >
          Shop
        </Link>
        <Link
          href={"/about"}
          className={pathName === "/about" ? "text-secondText" : ""}
        >
          About
        </Link>
        <Link
          href={"/blog"}
          className={pathName === "/blog" ? "text-secondText" : ""}
        >
          Blog
        </Link>
        <Link
          href={"/contact"}
          className={pathName === "/contact" ? "text-secondText" : ""}
        >
          Contact
        </Link>
        <Link
          href={"/pages"}
          className={pathName === "/pages" ? "text-secondText" : ""}
        >
          Pages
        </Link>
      </ul>
      <div className="flex justify-around  mr-10 text-sm text-primary font-bold cursor-pointer ">
        {!isLogged ? (
          <Link href={"/login"} className="">
            <BsFillPersonFill className="inline mr-2" /> Login / Register
          </Link>
        ) : (
          <div className="flex space-x-5">
            <Link href={`/profile`} className="">
              <BsFillPersonFill className="inline mr-2" />
              {name}
            </Link>
            <div className="flex  items-center">
              <p>{items}</p>
              <AiOutlineShoppingCart />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
