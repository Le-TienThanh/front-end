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

const CardComponent = (props) => {
  const {countInStock, name, price, rating, type, image, description, sold, discount} = props;
  return (
    <WrapperCardStyle
      hoverable
      stylesHeader={{ header: { width: "200px", height: "200px" } }}
      // headStyle = {{ width: '200px', height: '200px'}}
      // style={{ width: 200 }}
      stylesBody={{ body: { padding: "10px" } }}
      // bodyStyle = {{padding: '10px'}}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
        {price}
        <WrapperDiscountText>
          {-discount || -5} %

        </WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};
export default CardComponent;
