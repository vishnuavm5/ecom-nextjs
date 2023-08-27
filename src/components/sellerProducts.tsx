import React from "react";
import { Card } from "antd";
const { Meta } = Card;
import { EditOutlined } from "@ant-design/icons";
export interface myProductsData {
  itemName: string;
  price: number;
  img1: string;
}

const SellerProducts = (props: myProductsData) => {
  return (
    <div>
      <Card
        className="hover:cursor-pointer"
        style={{ width: 200, height: 300 }}
        cover={
          <img alt="example" src={props.img1} style={{ width: "100px" }} />
        }
        actions={[<EditOutlined key="edit" />]}
      >
        <Meta title={props.itemName} description={`₹ ${props.price}`} />
      </Card>
    </div>
  );
};

export default SellerProducts;
