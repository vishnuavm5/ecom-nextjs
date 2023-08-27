"use client";
import React, { useEffect } from "react";
import axios from "axios";

const EditProduct = ({ params }: any) => {
  const getData = async () => {
    const data: any = params.editproduct;
    const response = await axios.get("/api/products/getMyProduct", {
      params: data,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return <div>{params.editproduct}</div>;
};

export default EditProduct;
