import { Col, Row, Image, InputNumber, Button, Rate } from "antd";
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
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useState } from "react";
import { useSelector } from "react-redux";
const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct((prev) => (prev || 0) + 1);
    } else if (type === "decrease") {
      setNumProduct((prev) => Math.max((prev || 1) - 1, 1)); // Không để nhỏ hơn 1
    }
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const response = await ProductService.getDetailsProduct(id);
      return response.data;
    }
  };
  const { isLoading, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  return (
    <Loading isLoading={isLoading}>
      <Row
        style={{
          padding: "16px",
          background: "#fff",
          border: "1px solid blue",
          borderRadius: "5px",
        }}
      >
        <Col
          span={10}
          style={{ borderRight: "1px solid #ccc", paddingRight: "8px" }}
        >
          <Image
            src={productDetails.image}
            alt="image product"
            preview={false}
          />
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
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
            <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {productDetails?.price}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến</span>
            <span className="address"> {user?.address} </span>
            <span className="change-address"> Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderTop: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button style={{ border: "none", cursor: "pointer" }} onClick={() => handleChangeCount("decrease")} >
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>

              <WrapperInputNumber defaultValue={1} onChange={onChange} value={numProduct} />

              <button style={{ border: "none", cursor: "pointer" }} onClick={() => handleChangeCount("increase")} >
                <PlusOutlined
                  style={{ color: "#000", fontSize: "20px" }}
                  
                />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Button
              style={{
                background: "rgb(255, 57, 69)",
                color: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid",
              }}
            >
              Chọn mua
            </Button>
            <Button
              style={{
                background: "#fff",
                color: "rgb(13, 92, 182)",
                height: "48px",
                width: "220px",
                border: "1px solid rgb(12, 92, 182)",
              }}
            >
              Mua trước trả sau
            </Button>
          </div>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
