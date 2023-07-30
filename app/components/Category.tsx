import React from "react";
import Image from "next/image";
interface categoryProps {
  src: string;
  title: string;
  numberOfItems: number;
}
export default function Category(props: categoryProps) {
  return (
    <div className="">
      <div className=" relative w-fit h-fit">
        <div className=" z-[-1] inset-0 w-[206px] h-[233px]  flex flex-col items-center gap-2 flex-shrink-0 justify-center">
          <Image src={props.src} alt={props.title} fill={true}></Image>
          <div className="z-10 text-center ">
            <h5 className="text-white font-bold">{props.title}</h5>
            <p className="text-white font-semibold">
              {props.numberOfItems} items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
