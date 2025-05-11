import react, { Fragment, use, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { data, useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useEffect } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const response = await ProductService.getProductType(type, page, limit);
    if (response?.status === "OK") {
      setLoading(false);
      setProducts(response?.data);
      setPanigate({...panigate, total: response?.totalPage });
    } else {
      setLoading(false);
    }
  };
  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };
 
  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);
  return (
    <Loading isLoading={loading}>
      <div style={{ padding: "0 120px", background: "#fff", height: "calc(100vh - 64px)" }}>
        <Row style={{ flexWrap: "nowrap", paddingTop: "10px", height: "calc(100% - 20px)" }}>
          <WrapperNavbar span={4}>
            <NavbarComponent />
          </WrapperNavbar>
          <Col span={20}>
            <WrapperProducts>
              {products?.filter((pro) => {
                if(searchDebounce === "") {
                  return pro;
                  
                } else if (pro?.name?.toLowerCase().includes(searchDebounce?.toLowerCase())) {
                  return pro;
                }
              })?.map((product) => {
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
              defaultCurrent={panigate?.page + 1} 
              total={panigate?.total }
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
