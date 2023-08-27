"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Button, Image } from "antd";
const { Title, Text } = Typography;
import { ArrowRightOutlined } from "@ant-design/icons";
import { isSeller } from "@/store/selectors/isSeller";
import { useRecoilValue } from "recoil";
interface receivedData {
  itemName: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  sellerInfo: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
}

const Product = ({ params }: any) => {
  const seller = useRecoilValue(isSeller);
  const [product, setProduct] = useState<receivedData>({
    itemName: "",
    description: "",
    price: 0,
    category: "",
    rating: 0,
    sellerInfo: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });
  const getProduct = async () => {
    const data: any = { id: params.id };
    console.log(data);
    const response = await axios.get("/api/products/getProduct", {
      params: data,
    });

    await setProduct(response.data._doc);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <Row>
        <Col span={12}>
          <div className="ml-14">
            <Image width={300} src={product.img1} />
            <div className="flex space-x-10">
              <Image width={100} src={product.img2} className="rounded-md" />
              <Image width={100} src={product.img3} className="rounded-md" />
              <Image width={100} src={product.img4} className="rounded-md" />
            </div>
          </div>
        </Col>
        <Col span={12} className="flex flex-col space-y-6">
          <Title>{product.itemName}</Title>
          <Title level={5} className="whitespace-normal w-96">
            {product.description}
          </Title>
          <Text
            strong
            style={{ display: "block" }}
          >{`₹ ${product.price}`}</Text>
          {!seller && (
            <Button className="w-40" icon={<ArrowRightOutlined />}>
              Add to Cart
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Product;
