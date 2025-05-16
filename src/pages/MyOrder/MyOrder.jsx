import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { Button, Input, Form, Descriptions } from "antd";
import {
  WrapperCountOrder,
  WrapperFooterItem,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStatus,
  WrapperStyleHeader,
  WrapperStyleHeaderDelivery,
  WrapperTotal,
} from "./style";
import { Checkbox } from "antd";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { convertPrice } from "../../utils";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import * as UserService from "../../services/UserService";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import StepComponent from "../../components/StepComponent/StepComponent";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { WrapperContainer } from "../OrderSuccess/style";
const MyOrderPage = () => {
  const fetchMyOrder = async () => {
    const response = await OrderService.getOrderByUserId(
      state?.id,
      state?.token
    );
    return response.data;
  };
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate()
  const queryOrder = useQuery({
    queryKey: ["user"],
    queryFn: fetchMyOrder,
    enabled: state?.id && state?.token,
  });
  const { isLoading, data } = queryOrder;

  const renderProduct = () => {
    // viet code vao
  };
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      }
    })

  }
  const mutation = useMutationHooks(
    (data) => {
      const {id, token, orderItems} = data;
      const res = OrderService.cancelOrder(id, token, orderItems);
      return res;
    }
  )
  const handleCancelOrder = (order) => {
    mutation.mutate({id: order._id, token: state?.token, orderItems: order?.orderItems}, {
      onSuccess: () => {
        queryOrder.refetch();
      }
    })
    
  }
  const {isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel} = mutation;
  useEffect(() => {
    if(isSuccessCancel && dataCancel?.status === "OK"){
      message.success();
    } else if( isErrorCancel){
      message.error();

    }
 
  }, [isErrorCancel, isSuccessCancel])

  return (
    <WrapperContainer>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h4>Đơn hàng của tôi</h4>
        <WrapperListOrder>
          {data?.map((order) => {
            return (
              <WrapperItemOrder key={order?.id}>
                <WrapperStatus>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Trạng thái
                  </span>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      Giao hàng:
                    </span>
                    {`${order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}`}
                  </div>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      Thanh toán:
                    </span>
                    {`${order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}`}
                  </div>
                </WrapperStatus>
                {renderProduct(order?.orderItems)}
                <WrapperFooterItem>
                  <div>
                    <span style={{color: "rgb(255, 66, 78)"}}>Tổng tiền</span>
                    <span style={{fontSize: "13px", color: "rgb(56, 56, 61)", fontWeight: 700}}>
                      {convertPrice(order?.totalPrice)}

                    </span>
                  </div>
                  <div style={{display: "flex", gap: "10px"}}>
                    <Button
                    onClick={() => handleCancelOrder(order)}
                    >
                      Hủy đơn hàng
                    </Button>
                    <Button
                    onClick={() => handleDetailsOrder(order)}
                    >
                      Xem chi tiết
                    </Button>

                  </div>
                </WrapperFooterItem>
              </WrapperItemOrder>
            );
          })}
        </WrapperListOrder>
      </div>
    </WrapperContainer>
  );
};
export default MyOrderPage;
