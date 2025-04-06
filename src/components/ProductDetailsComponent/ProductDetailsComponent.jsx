import { Col, Row, Image, InputNumber, Button } from "antd";
import React from "react";
import imageProduct from "../../assets/img/test.webp";
import imageProductSmall from "../../assets/img/imgsmall.webp";
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
  WrapperBtnQualityProduct,
} from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { Color } from "antd/es/color-picker";
const ProductDetailsComponent = ({ name }) => {
  const onChange = () => {};
  return (
    <Row
      style={{
        padding: "16px",
        background: "#fff",
        border: "1px solid blue",
        borderRadius: "5px",
      }}
    >
      <Col span={10} style={{borderRight:'1px solid #ccc', paddingRight:'8px'}}>
        <Image src={imageProduct} alt="image product" preview={false} />
        <Row style={{ marginTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{paddingLeft: '10px'}} >
        <WrapperStyleNameProduct>
          Điện thoại Iphone16 128GB giá vô cùng rẻ mua tại shop của tôi, giảm
          giá cho cô Linh
        </WrapperStyleNameProduct>
        <div>
          <StarFilled style={{ fontSize: "15px", color: "yellow" }} />
          <StarFilled style={{ fontSize: "15px", color: "yellow" }} />
          <StarFilled style={{ fontSize: "15px", color: "yellow" }} />
          <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>20.000.000</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến</span>
          <span className="address"> Đại học Bách Khoa Hà Nội</span>
          <span className="change-address"> Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div style={{margin: '10px 0 20px', padding: '10px 0', borderTop:'1px solid #ccc', borderBottom:'1px solid #ccc'}} >
          <div style={{marginBottom: '10px'}} >Số lượng</div>
          <WrapperQualityProduct>
            <button style={{ border: "none" }}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>

            <WrapperInputNumber defaultValue={1} onChange={onChange} />

            <button style={{ border: "none" }}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{display: 'flex', alignItems: "center", gap: '12px'}} >
          <Button style={{ background: "rgb(255, 57, 69)", color: "#fff", height: '48px', width: '220px', border: '1px solid' }}>
            Chọn mua
          </Button>
          <Button style={{ background: "#fff", color: "rgb(13, 92, 182)", height: '48px', width: '220px', border: '1px solid rgb(12, 92, 182)' }}>
            Mua trước trả sau
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
