import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import Item from "antd/es/list/Item";
import { WrapperTypeProduct, WrapperButtonMore, WrappeProducts, WrapperProducts } from "./style";
import { Button } from "antd";

import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/img/slider1.webp";
import slider2 from "../../assets/img/slider2.webp";
import slider3 from "../../assets/img/slider3.webp";
import slider4 from "../../assets/img/slider4.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useQueries } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const Homepage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const arr = ["TV", "Tủ lạnh", "Laptop", "Ipad"];
  const fetchProductAll = async (context) => {
    
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const response = await ProductService.getAllProduct(search, limit);
   
    return response;
    
    
  };
  
  
  const { isLoading, data: products, isPreviousData } = useQuery({
    queryKey: ["product", limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  
  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body">
        <div
          id="container"
          style={{
            backgroundColor: "#fff",
            padding: "0 120px",
            height: "1000px",
          }}
        >
          <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating = {product.rating}
                  type = {product.type}
                  sold = {product.sold}
                  discount = {product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
            
            styleButton={{color: `${products?.total === products?.data?.length ? "rgb(11, 116, 229)" : "#ccc"}`}}
            disabled={products?.total === products?.data?.length || products?.totalPage === 1}
              styleTextButton={{
                color: `${products?.total === products?.data?.length && "#fff"}`,
              }}
              onClick={() => setLimit((prev) => prev + 6)}
            
            >Xem thêm</WrapperButtonMore>
            
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Homepage;
