import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Label,
  WrapperContainer,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
 
  WrapperItemOrderInfo,
 
  WrapperValue,
} from "./style";

import { convertPrice } from "../../utils";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const {state} = location;
  

  
  
  
  return (
    <div style={{ background: "#ccc", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ fontSize: "25px" }}>Đơn hàng đặt thành công</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Label>Phương thức giao hàng</Label>
                <WrapperValue>
                  <span
                    style={{
                      color: "#ea8500",
                      fontWeight: "bold",
                      marginRight: "10px",
                    }}
                  >
                    {orderContant.delivery[state?.delivery]}
                  </span>
                  Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Label>Chọn phương thức thanh toán</Label>
                <WrapperValue>{orderContant.payment[state?.payment]}</WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.name}>
                <div
                  style={{
                    width: "500px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                 
                  <img
                    src=  {order?.image}
                    style={{
                      width: "77px",
                      height: "79px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      width: "260px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "15px",
                    }}
                  >
                    {order?.name}
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <span>
                    <span
                      style={{
                        fontSize: "15px",
                        color: "rgb(255, 66, 78)",
                      }}
                    >
                     Giá tiền: {convertPrice(order?.price)}
                    </span>
                  </span>
                  
                 <span>
                    <span
                      style={{
                        color: "rgb(255, 66, 78)",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      Số lượng: { order?.mount}
                    </span>
                 </span>
                  
                </div>
              </WrapperItemOrder>

                )
              })}
              
            </WrapperItemOrderInfo>
            <span>
                    <span
                      style={{
                        color: "rgb(255, 66, 78)",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      Tổng tiền: {convertPrice(state?.totalPriceMemo)}
                    </span>
                 </span>
          </WrapperContainer>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccess;
