import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperCardStyle,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const {countInStock, name, price, rating, type, image, description, sold, discount, id} = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{  width: "200px", height: "200px"  }}
      style={{width : 200}}
      bodyStyle={{ padding: "10px" }}


      
      onClick={() => handleDetailsProduct(id)}
     
      cover={
        <img
          alt="example"
          src={image}
        />
      }
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating}</span>{" "}
          <StarFilled style={{ fontSize: "15px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell>| Đã bán {sold || 1000} +</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        {price.toLocaleString()} 
        <WrapperDiscountText>
            - {  discount ||  5} %

        </WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};
export default CardComponent;
