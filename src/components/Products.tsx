import React from "react";
import { Card } from "antd";

const { Meta } = Card;
interface data {
  name: string;
  price: number;
  img1: any;
}

const ProductsComp = (props: data) => {
  return (
    <div>
      <Card
        hoverable
        style={{ width: 200, height: 270 }}
        cover={
          <img
            alt="example"
            src={props.img1}
            style={{ padding: "10px", width: "150px" }}
          />
        }
        size="default"
      >
        <Meta title={props.name} description={`₹ ${props.price}`} />
      </Card>
    </div>
  );
};

export default ProductsComp;
