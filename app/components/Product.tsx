import React from "react";
import Image from "next/image";

interface CardProps {
  src: string;
  title: string;
  category: string;
  price: number;
  colors: string[]; // Array of available colors
}

export default function Product(props: CardProps) {
  return (
    <div className="w-[238px] flex flex-col items-center space-y-2">
      <Image src={props.src} alt={props.title} width={239} height={300} />
      <h5 className="text-secondText font-bold">{props.title}</h5>
      <p className="text-text text-[14px]">{props.category}</p>
      <h5 className="text-secondary">${props.price}</h5>
      <div className="flex items-center gap-1">
        {props.colors.map((color, index) => (
          <div
            key={index}
            className={`border-gray-600 h-4 w-4 rounded-full border `}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
