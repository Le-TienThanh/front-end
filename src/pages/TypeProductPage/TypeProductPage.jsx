import react, { Fragment, use, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { data, useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useEffect } from "react";
import Loading from "../../components/LoadingComponent/Loading";

const TypeProductPage = () => {
  const onChange = () => {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const fetchProductType = async (type) => {
    setLoading(true);
    const response = await ProductService.getProductType(type);
    if (response?.status === "OK") {
      setLoading(false);
      setProducts(response?.data);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);
  return (
    <Loading isLoading={loading}>
      <div style={{ padding: "0 120px", background: "#fff", height: "calc(100vh - 64px)" }}>
        <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
          <WrapperNavbar span={4}>
            <NavbarComponent />
          </WrapperNavbar>
          <Col span={20}>
            <WrapperProducts>
              {products?.map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    sold={product.sold}
                    discount={product.discount}
                    id={product._id}
                  />
                );
              })}
            </WrapperProducts>
            <Pagination
              defaultCurrent={2}
              total={100}
              onChange={onChange}
              style={{ textAlign: "center", marginTop: "10px" }}
            />
          </Col>
        </Row>
      </div>
    </Loading>
  );
};
export default TypeProductPage;
