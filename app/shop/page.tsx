"use client";
import Product from "../components/Product";
import Category from "../components/Category";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { SiWindows11 } from "react-icons/si";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getData = async () => {
  const data = axios("http://localhost:3500/products");
  console.log(data);
  return data;
};

export default function Shop() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });
  console.log(data);
  const router = useRouter();
  return (
    <>
      <div className=" px-20 bg-lightGray">
        <h3 className="py-6">shop</h3>
        <div className="flex justify-center">
          <div className="grid grid-cols-5 pb-10 gap-3  self-center ">
            <Category
              numberOfItems={5}
              src="/../public/card-cover-5.jpg"
              title="cloths"
            />
            <Category
              numberOfItems={5}
              src="/../public/card-cover-6.jpg"
              title="cloths"
            />
            <Category
              numberOfItems={5}
              src="/../public/card-cover-7.jpg"
              title="cloths"
            />
            <Category
              numberOfItems={5}
              src="/../public/card-cover-8.jpg"
              title="cloths"
            />
            <Category
              numberOfItems={5}
              src="/../public/card-cover-9.jpg"
              title="cloths"
            />
          </div>
        </div>
      </div>
      <div className="flex  px-20 pt-10  justify-around items-center">
        <h6>Showin all 12 result</h6>
        <div className="flex gap-2 ">
          <h6>Views:</h6>
          <div className="w-fit h-fit border">
            <AiOutlineUnorderedList />
          </div>
          <div className="w-fit h-fit border">
            <SiWindows11 />
          </div>
        </div>
        <div className="space-x-2 flex">
          <div className="border px-3 py-2 rounded-md bg-lightGray text-[14] ">
            <select name="list" id="list" className=" focus:outline-none ">
              <option value="popularity">popularity</option>
            </select>
          </div>
          <Button size="sm" color="primary">
            Filter
          </Button>
        </div>
      </div>
      <main className=" px-36 pt-10 gap-9 flex-wrap pb-20 flex">
        {data &&
          data.data.map(
            (
              product: {
                title: string;
                category: string;
                image: string;
                colors: string[];
                price: number;
              },
              index: number
            ) => (
              <div
                className="cursor-pointer"
                onClick={() => router.push(`shop/${index}`)}
              >
                <Product
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  key={index}
                  colors={product.colors}
                  src={product.image}
                />
              </div>
            )
          )}
      </main>
    </>
  );
}
function async() {
  throw new Error("Function not implemented.");
}
