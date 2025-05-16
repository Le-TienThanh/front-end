import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { Button, Input, Form, Radio } from "antd";
import {
  Label,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRadio,
  WrapperRadioPayment,
  WrapperRight,
  WrapperStyleHeader,
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
import * as OrderService from "../../services/OrderService";
const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",

    phone: "",
    city: "",
    address: "",
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const response = OrderService.createOrder({ ...rests }, token);
    return response;
  });
  const { isLoading, data } = mutationUpdate;
  const {
    isLoading: isLoadingAddOrder,
    isSuccess,
    isError,
    data: dataAdd,
  } = mutationAddOrder;
  
  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const arrayOrdered = [];
      order?.orderItemsSelected?.forEach(element => {
        arrayOrdered.push(element.product);
      })
      dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
      message.success("Đặt hàng thành công");
      navigate("/order-success", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSelected,
          totalPriceMemo: totalPriceMemo,
        },
      });
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);
  



  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

 
  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);
  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);
  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount * cur.amount) / 100)
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);
  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 10000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);
  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);
  console.log({
  token: user?.access_token,
  orderItemsSelected: order?.orderItemsSelected,
  name: user?.name,
  address: user?.address,
  phone: user?.phone,
  city: user?.city,
  priceMemo,
  userId: user?.id
});

  const handleAddOrder = () => {
    
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: deliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    }
  };
  
  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        {
          id: user?.id,
          token: user?.access_token,
          ...stateUserDetails,
        },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };
  const handleDelivery = (e) => {
    setDelivery(e.target.value);
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };


  return (
    <div style={{ background: "#ccc", width: "100%", height: "100vh" }}>
      
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "20px" }}>Chọn phương thức thanh toán</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Label>Chọn phương thức giao hàng</Label>
                  <WrapperRadio onChange={handleDelivery} value={delivery}>
                    <Radio value="fast">
                      <span
                        style={{
                          color: "#ea8500",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        FAST
                      </span>
                      Giao hàng tiết kiệm
                    </Radio>
                    <Radio value="gojek">
                      <span
                        style={{
                          color: "#ea8500",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        GO_JEK
                      </span>
                      Giao hàng tiết kiệm
                    </Radio>
                    <Radio value="bee">
                      <span
                        style={{
                          color: "#ea8500",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        BEE
                      </span>
                      Giao hàng tiết kiệm
                    </Radio>
                    <Radio value="grab">
                      <span
                        style={{
                          color: "#ea8500",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        Grab
                      </span>
                      Giao hàng tiết kiệm
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Label>Chọn phương thức thanh toán</Label>
                  <WrapperRadioPayment onChange={handlePayment} value={payment}>
                    <Radio value="later_money">Thanh toán khi nhận hàng</Radio>
                  </WrapperRadioPayment>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div>
                    <span style={{ fontSize: "15px" }}>Địa chỉ giao hàng: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {`${user?.address} ${user?.city}`}{" "}
                    </span>
                    <span
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={handleChangeAddress}
                    >
                      {" "}
                      Thay đổi{" "}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "15px" }}>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}{" "}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "15px" }}>Giảm giá</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceDiscountMemo)}{" "}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "15px" }}>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(deliveryPriceMemo)}{" "}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span style={{ fontSize: "20px" }}>Tổng tiền</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(totalPriceMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "11px" }}>
                      (Đã bao gồm VAT nếu có)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              <Button
                style={{
                  background: "rgb(255, 57, 69)",
  
                  color: "#fff",
                  height: "48px",
                  width: "100%",
                  border: "1px solid",
                  fontWeight: "500",
                  margin: "26px 0 10px",
                  marginLeft: "10px",
                }}
                onClick={() => handleAddOrder()}
              >
                Đặt hàng
              </Button>
            </WrapperRight>
          </div>
        </div>
        <ModalComponent
          title="Cập nhật thông tin giao hàng"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancelUpdate}
          onOk={handleUpdateInforUser}
        >
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ width: "50vw" }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
                style={{ width: "50%" }}
              />
            </Form.Item>
  
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
                style={{ width: "50%" }}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input your address!" }]}
            >
              <Input
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
                style={{ width: "50%" }}
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input
                value={stateUserDetails.city}
                onChange={handleOnchangeDetails}
                name="city"
                style={{ width: "50%" }}
              />
            </Form.Item>
          </Form>
        </ModalComponent>
     
    </div>
  );
};
export default PaymentPage;
