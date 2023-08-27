"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { userId } from "@/store/selectors/userId";
import { useRecoilValue } from "recoil";
import SellerProducts from "@/components/sellerProducts";
import Link from "next/link";

export interface myProductsData {
  itemName: string;
  price: number;
  img1: string;
  _id: string;
}

const sellerProducts = () => {
  const [products, setProducts] = useState<myProductsData[]>([]);
  const data: any = { id: useRecoilValue(userId) };

  const getMyProducts = async () => {
    try {
      const response = await axios.get("/api/products/myProducts", {
        params: data,
      });
      await setProducts(response.data.myProducts);
      console.log(products);
      console.log(response.data._doc);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyProducts();
  }, []);
  return (
    <div>
      <div className="grid sm:grid-cols-4  grid-cols-1 gap-4 mt-10  sm:mx-32 mx-20">
        {products.map((product) => {
          return (
            <Link href={`/sellerProducts/${product._id}`}>
              <SellerProducts
                key={product._id}
                itemName={product.itemName}
                price={product.price}
                img1={product.img1}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default sellerProducts;
