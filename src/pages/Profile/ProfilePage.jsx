import react, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Flex, Upload } from "antd";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email || "");
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setAddress(user?.address || "");
    setAvatar(user?.avatar || "");
  }, [user]);

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Cập nhật thông tin thành công!");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error("Cập nhật thất bại!");
    }

    // Tắt trạng thái loading sau khi xử lý xong
    setIsLoadingUpdate(false);
  }, [isSuccess, isError, data, user]);

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      if (res?.data) {
        dispatch(updateUser({ ...res?.data, access_token: token }));
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangeName = (value) => {
    setName(value);
  };

  const handleOnChangePhone = (value) => {
    setPhone(value);
  };

  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };

  const handleOnChangeAvatar = async ({fileList}) => {
    const file = fileList[0];
    if(!file.url && !file.preview){
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    if (!user?.id || !user?.access_token) {
      message.error("Thông tin người dùng không hợp lệ!");
      return;
    }

    setIsLoadingUpdate(true);
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isLoadingUpdate}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
              value={name}
              onChange={handleOnChangeName}
              id="name"
            />
            <Flex gap="small" wrap>
              <Button
                onClick={handleUpdate}
                style={{
                  color: "rgb(26,148,255)",
                  fontFamily: "Arial",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
                loading={isLoadingUpdate}
              >
                Cập nhật
              </Button>
            </Flex>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
              value={email}
              onChange={handleOnChangeEmail}
              id="email"
            />
            <Flex gap="small" wrap>
              <Button
                onClick={handleUpdate}
                style={{
                  color: "rgb(26,148,255)",
                  fontFamily: "Arial",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
                loading={isLoadingUpdate}
              >
                Cập nhật
              </Button>
            </Flex>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
              value={phone}
              onChange={handleOnChangePhone}
              id="phone"
            />
            <Flex gap="small" wrap>
              <Button
                onClick={handleUpdate}
                style={{
                  color: "rgb(26,148,255)",
                  fontFamily: "Arial",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
                loading={isLoadingUpdate}
              >
                Cập nhật
              </Button>
            </Flex>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                alt="avatar"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

            )}
            <Flex gap="small" wrap>
              <Button
                onClick={handleUpdate}
                style={{
                  color: "rgb(26,148,255)",
                  fontFamily: "Arial",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
                loading={isLoadingUpdate}
              >
                Cập nhật
              </Button>
            </Flex>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm
              style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
              value={address}
              onChange={handleOnChangeAddress}
              id="address"
            />
            <Flex gap="small" wrap>
              <Button
                onClick={handleUpdate}
                style={{
                  color: "rgb(26,148,255)",
                  fontFamily: "Arial",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
                loading={isLoadingUpdate}
              >
                Cập nhật
              </Button>
            </Flex>
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
