"use client";
import React, { useEffect } from "react";
import { CATEGORIES } from "@/constants/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemData, itemDataparams } from "@/Validations/validation";
import { useRouter } from "next/navigation";

import axios from "axios";
import { message } from "antd";
import { useRecoilValue } from "recoil";
import { userId } from "@/store/selectors/userId";
import Resizer from "react-image-file-resizer";

const defaultimg =
  "https://img.icons8.com/?size=512&id=cD26kdwTbCzt&format=png";
type receivedData = {
  itemName: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
};
interface ProductFormProps {
  mode: "create" | "edit";
  initialData?: receivedData;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, initialData }) => {
  const router = useRouter();
  const sellerInfo = useRecoilValue(userId);

  const [image1, setImage1] = useState<string | undefined>(defaultimg);
  const [image2, setImage2] = useState<string | undefined>(defaultimg);
  const [image3, setImage3] = useState<string | undefined>(defaultimg);
  const [image4, setImage4] = useState<string | undefined>(defaultimg);
  const imageChange = (e: any) => {
    if (e.target.id === "img1") {
      setImage1(URL.createObjectURL(e.target.files[0]));
      console.log(e.target.files);
    } else if (e.target.id === "img2") {
      setImage2(URL.createObjectURL(e.target.files[0]));
    } else if (e.target.id === "img3") {
      setImage3(URL.createObjectURL(e.target.files[0]));
    } else if (e.target.id === "img4") {
      setImage4(URL.createObjectURL(e.target.files[0]));
    }
  };
  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<itemDataparams>({ resolver: zodResolver(itemData) });
  const onSubmit = async (data: itemDataparams) => {
    try {
      console.log(data);
      const { img1, img2, img3, img4, ...restofthedata } = data;
      const newData = {
        ...restofthedata,
        img1: await resizeFile(img1[0]),
        img2: await resizeFile(img2[0]),
        img3: await resizeFile(img3[0]),
        img4: await resizeFile(img4[0]),
        sellerInfo,
      };
      const response = await axios.post("/api/products/addProduct", newData);
      if (response.data.success) {
        message.success("Product added successfully");
        router.push("/products");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setImage1(initialData.img1);
      setImage2(initialData.img2);
      setImage3(initialData.img3);
      setImage4(initialData.img4);
    }
  }, [mode, initialData]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex min-h-screen  justify-around flex-wrap">
        <div className="flex flex-col space-y-8">
          <div>
            <input
              type="file"
              className="hidden"
              id="img1"
              {...register("img1", { onChange: imageChange })}
            />
            <label htmlFor="img1">
              <img
                src={image1}
                alt="image1"
                className=" w-20 rounded-md"
                style={{ opacity: 0.2 }}
              />
            </label>
            {errors.img1 && (
              <span className="text-red-600 text-xs">
                {errors.img1.message}
              </span>
            )}
          </div>
          <div>
            <input
              type="file"
              className="hidden"
              id="img2"
              {...register("img2", { onChange: imageChange })}
            />
            <label htmlFor="img2">
              <img
                src={image2}
                alt="image2"
                className=" w-20 rounded-md"
                id="img2"
                style={{ opacity: 0.2 }}
              />
            </label>
            {errors.img2 && (
              <span className="text-red-600 text-xs">
                {errors.img2.message}
              </span>
            )}
          </div>
          <div>
            <input
              type="file"
              className="hidden"
              id="img3"
              {...register("img3", { onChange: imageChange })}
            />
            <label htmlFor="img3">
              <img
                src={image3}
                alt="image3"
                className=" w-20 rounded-md"
                style={{ opacity: 0.2 }}
              />
            </label>
            {errors.img3 && (
              <span className="text-red-600 text-xs">
                {errors.img3.message}
              </span>
            )}
          </div>
          <div>
            <input
              type="file"
              className="hidden"
              id="img4"
              {...register("img4", { onChange: imageChange })}
            />
            <label htmlFor="img4">
              <img
                src={image4}
                alt="image4"
                className=" w-20 rounded-md"
                id="img4"
                style={{ opacity: 0.2 }}
              />
            </label>
            {errors.img4 && (
              <span className="text-red-600 text-xs">
                {errors.img4.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-6 w-96">
          <h1 className=" text-lg font-bold">Product Form</h1>
          <div className="flex  justify-between">
            <p className=" text-xs font-semibold"> Name :</p>
            <div className="flex flex-col">
              <input
                placeholder="Product name"
                className=" rounded-md  w-72"
                defaultValue={mode === "edit" && initialData?.itemName}
                {...register("itemName")}
              />
              {errors.itemName && (
                <span className="text-red-600 text-xs">
                  {errors.itemName.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <p className=" text-xs font-semibold"> Description :</p>
            <div className="flex flex-col">
              <textarea
                maxLength={500}
                style={{ height: 120, resize: "none" }}
                placeholder="Product description"
                className="rounded-md w-72"
                defaultValue={mode === "edit" && initialData?.description}
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-600 text-xs">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex  justify-between">
            <label htmlFor="price" className="text-xs font-semibold">
              Price :
            </label>
            <div className="flex flex-col">
              <input
                type="number"
                className="rounded-md w-72"
                defaultValue={mode === "edit" && initialData?.price}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <span className="text-red-600 text-xs">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex  justify-between">
            <label htmlFor="category" className="text-xs font-semibold">
              Category :
            </label>
            <div className="flex flex-col">
              <select className="rounded-md py-2 px-8 focus:ring">
                {mode === "edit" && <option>{initialData?.category}</option>}
                {CATEGORIES.map((cat) => {
                  return <option {...register("category")}>{cat}</option>;
                })}
              </select>
              {errors.category && (
                <span className="text-red-600 text-xs">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <label htmlFor="stock" className="text-xs font-semibold">
              Quantity :
            </label>
            <div className="flex flex-col">
              <input
                type="number"
                className=" rounded-md"
                placeholder="0"
                defaultValue={mode === "edit" && initialData?.stock}
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <span className="text-red-600 text-xs">
                  {errors.stock.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <input
              className=" rounded-md bg-blue-600  text-white p-4 text-base font-semibold hover:bg-sky-700 hover:cursor-pointer"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
