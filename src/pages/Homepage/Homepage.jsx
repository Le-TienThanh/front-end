import react from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import Item from "antd/es/list/Item";
import { WrapperTypeProduct, WrapperButtonMore, WrappeProducts } from "./style";
import { Button } from "antd";

import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/img/slider1.webp";
import slider2 from "../../assets/img/slider2.webp";
import slider3 from "../../assets/img/slider3.webp";
import slider4 from "../../assets/img/slider4.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const Homepage = () => {
  const arr = ["TV", "Tủ lạnh", "Laptop", "Ipad"];
  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body"  >
      <div
        id="container"
        style={{
          backgroundColor: "#fff",
          padding: "0 120px",
          height: "1000px",
          
        }}
      >
        <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
        <WrappeProducts>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </WrappeProducts>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <WrapperButtonMore>Xem thêm</WrapperButtonMore>
        </div>
      </div>



      </div>
    </>
  );
};

export default Homepage;
