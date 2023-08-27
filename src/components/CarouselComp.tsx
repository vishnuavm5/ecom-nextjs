import React from "react";
import { Carousel } from "antd";
const contentStyle: React.CSSProperties = {
  height: "200px",
  marginLeft: "30%",
  marginRight: "30%",
  background: "#364d79",
  width: "500px",
  borderRadius: "10px",
};

const CarouselComp = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <img
            src="https://img.freepik.com/free-photo/front-view-woman-with-shopping-bag-concept_23-2148674158.jpg?w=1380&t=st=1692991032~exp=1692991632~hmac=09d4ee0a7795dd0e116e83fba1bd187450137cee0e26f3f192d16a2959e01b15"
            alt=""
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg"
            alt=""
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/mega-sale-banner-your-online-store-realistic-style-with-phone-map-cart-bag-gift-vector-illustration_548887-132.jpg"
            alt=""
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src="https://img.freepik.com/premium-vector/digital-marketing-concept-online-shopping-mobile-application_68971-367.jpg"
            alt=""
            style={contentStyle}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComp;
