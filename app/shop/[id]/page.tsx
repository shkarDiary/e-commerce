"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { notFound } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useCart } from "@/app/context/cart";
const getData = async (id: string = "error") => {
  const data = axios(`http://localhost:3500/products/${id}`);
  console.log(data);
  return data;
};
export default function page() {
  const { addItemToCart, cartItems } = useCart();
  const path = usePathname();
  const lastSegment = path.split("/").pop()?.toString();
  useEffect(() => {
    // The cartItems.length will automatically reflect the number of items in the cart
    console.log("Number of items in the cart:", cartItems.length);
  }, [cartItems]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["d"],
    queryFn: () => getData(lastSegment),
  });
  if (isError) {
    notFound();
  } else if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center ">
        {" "}
        <AiOutlineLoading size={100} className={"animate-spin "} />
      </div>
    );
  }
  console.log(data);
  console.log(cartItems);
  return (
    <div className="py-10 px-20 flex items-start gap-7">
      <div className="w-[506px] h-[546px] relative shrink-0">
        <div className="w-[506px] h-[450px] relative">
          <Image src={data.data.image} alt={data.data.title} fill />
        </div>
      </div>
      <div className="space-y-10">
        <div className="space-y-4">
          <h4 className="font-bold">{data.data.title}</h4>
          <h5 className="text-primary font-semibold">${data.data.price}</h5>
          <h6>
            Availability :{" "}
            {data.data.itemNumber > 0 ? (
              <span>in Stock</span>
            ) : (
              <span>sold out</span>
            )}
          </h6>
          <p>{data.data.description}</p>
        </div>
        <hr />
        <div className="flex gap-2">
          {data.data.colors.map((color: string, index: number) => (
            <div
              key={index}
              className={`border-gray-600 h-8 w-8 rounded-full border `}
              style={{ background: color }}
            />
          ))}
        </div>
        <div className=" absolute bottom-16  ">
          <Button
            color="primary"
            size="md"
            onClick={() => {
              addItemToCart({ id: 1, name: "Item 1", price: 10 });
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
