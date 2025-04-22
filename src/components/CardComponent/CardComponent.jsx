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

const CardComponent = () => {
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
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>4.96</span>{" "}
          <StarFilled style={{ fontSize: "15px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000đ<WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};
export default CardComponent;
