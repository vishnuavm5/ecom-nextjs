"use client";
import CarouselComp from "@/components/CarouselComp";
import ProductsComp from "@/components/Products";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HyperCard from "@/ui/HyperCard";
import Link from "next/link";
interface data {
  itemName: string;
  price: number;
  img1: string;
  _id: string;
  category: string;
  rating: number;
}

const Products = () => {
  const [items, setItems] = useState<data[]>([]);
  const getData = async () => {
    try {
      const response = await axios.get("/api/products");
      setItems(response.data.allitems);
      // console.log(response.data.allitems);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <CarouselComp />
      <div className="grid sm:grid-cols-4  grid-cols-1 gap-4 mt-10  sm:mx-32 mx-20">
        {items.map((item) => {
          return (
            <Link href={`/products/${item._id}`}>
              <ProductsComp
                key={item._id}
                name={item.itemName}
                price={item.price}
                img1={item.img1}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
