import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Select, Space } from "antd";
import {
  PlusCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Checkbox, Form, Input, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperUploadFile } from "../../pages/Profile/style";
import { getBase64, renderOptions } from "../../utils";
import { createProduct } from "../../services/ProductService";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as messageProduct from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import InputComponent from "../InputComponent/InputComponent";
import { useSelector } from "react-redux";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const user = useSelector((state) => state?.user);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [typeSelect, setTypeSelect] = useState("");
  const initial = () => ({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    newType: "",
    discount: "",

  })

  const [stateProduct, setStateProduct] = useState(initial());

  const [stateProductDetails, setStateProductDetails] = useState(initial());

  const [form] = Form.useForm();
  const mutation = useMutationHooks((data) => {
    const { name, price, description, rating, image, type, countInStock, discount } =
      data;
    const res = ProductService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock,
      discount,
    });
    return res;
  });
  const { data, isLoading, isSuccess, isError } = mutation;

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });
  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });

  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;
  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      messageProduct.success("Thành công");
      handleCancel();
    } else if (isError) {
      messageProduct.error("Đã xảy ra lỗi");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      messageProduct.success("Thành công");
    } else if (isErrorDeletedMany) {
      messageProduct.error("Đã xảy ra lỗi");
    }
  }, [isSuccessDeletedMany]);
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      messageProduct.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      messageProduct.error();
    }
  }, [isSuccessUpdated]);
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      messageProduct.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      messageProduct.error();
    }
  }, [isSuccessDeleted]);
  useEffect(() => {
    if(!isModalOpen){

      form.setFieldsValue(stateProductDetails);
    } else{
      form.setFieldsValue(initial());
    }
  }, [form, stateProductDetails, isModalOpen]);
  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  useEffect(() => {
    if (isModalOpenDelete) {
      mutationDeleted.reset(); // đảm bảo reset trạng thái loading/success/error
    }
  }, [isModalOpenDelete]);

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
      });
    }
    setIsLoadingUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
      discount: "",
    });
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
    mutationDeleted.reset(); // chat gpt
  };
  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };
  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeImageDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
    });
    form.resetFields();
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText("");
  };
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const handleDeleteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };

  const fetchAllTypeProduct = async () => {
    const response = await ProductService.getAllTypeProduct("", 100);
    return response;
  };

  // const onFinish = () => {
  //   setIsCreate(true); // bật loading

  //   mutation.mutate(stateProduct, {
  //     onSuccess: (data) => {
  //       messageProduct.success("Thêm sản phẩm thành công!");
  //       // thực hiện hành động khác nếu cần
  //     },
  //     onError: (error) => {
  //       messageProduct.error("Đã xảy ra lỗi khi thêm sản phẩm!");
  //       console.error(error);
  //     },
  //     onSettled: () => {
  //       queryProduct.refetch();
  //     },
  //   });

  // };
  const onFinish = () => {
    setIsCreate(true);
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    };
    mutation.mutate(params, {
      // onSuccess: (data) => {
      //   messageProduct.success("Thêm sản phẩm thành công!");
      // },
      // onError: (error) => {
      //   messageProduct.error("Đã xảy ra lỗi khi thêm sản phẩm!");
      //   console.error(error);
      // },
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateProductDetails,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const typeProduct = useQuery({
    queryKey: ["type-products"],
    queryFn: fetchAllTypeProduct,
  });
  console.log("stateProduct", stateProduct);
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          // onClick={() => setIsModalOpenDelete(true)}
          onClick={() => {
            mutationDeleted.reset(); // reset trước khi mở modal
            setIsModalOpenDelete(true);
          }} // chat gpt
        />
        <EditOutlined
          style={{ color: "blue", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => {
            var _a;
            return (_a = searchInput.current) === null || _a === void 0
              ? void 0
              : _a.select();
          }, 100);
        }
      },
    },
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        { text: ">= 50", value: ">=" },
        { text: "<= 50", value: "<=" },
      ],
      // filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => {
        console.log("value", { value, record });
        if (value === ">=") {
          return record.price >= 50;
        } else {
          return record.price <= 50;
        }
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        { text: ">= 3", value: ">=" },
        { text: "<= 3", value: "<=" },
      ],
      // filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => {
        console.log("value", { value, record });
        if (value === ">=") {
          return Number(record.rating) >= 3;
        } else {
          return Number(record.rating) <= 3;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div>
        <TableComponent
          handleDeleteMany={handleDeleteManyProducts}
          columns={columns}
          isLoading={isLoadingProducts}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isLoading={isCreate}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                value={stateProduct.name}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Select
                name="type"
                value={stateProduct.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeProduct?.data?.data)}
              />
            </Form.Item>
            {stateProduct.type === "add_type" && (
              <Form.Item
                label="New type"
                name="newType"
                rules={[{ required: true, message: "Please input your type!" }]}
              >
                <Input
                  value={stateProduct.newType}
                  onChange={handleOnchange}
                  name="newType"
                />
              </Form.Item>
            )}

            <Form.Item
              label="Count InStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count inStock!" },
              ]}
            >
              <Input
                value={stateProduct.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <Input
                value={stateProduct.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Input
                value={stateProduct.rating}
                onChange={handleOnchange}
                name="rating"
              />
            </Form.Item>
             <Form.Item
              label="Discount"
              name="discount"
              rules={[
                { required: true, message: "Please input your discount!" },
              ]}
            >
              <Input
                value={stateProductDetails.discount}
                onChange={handleOnchangeDetails}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input
                value={stateProduct.description}
                onChange={handleOnchange}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile onChange={handleOnchangeImage} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "50px",
                    }}
                    alt="img"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        height="100vh"
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ width: "50vw" }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                value={stateProductDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Input
                value={stateProductDetails.type}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>
            <Form.Item
              label="Count InStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count inStock!" },
              ]}
            >
              <Input
                value={stateProductDetails.countInStock}
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <Input
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Input
                value={stateProductDetails.rating}
                onChange={handleOnchangeDetails}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                { required: true, message: "Please input your discount!" },
              ]}
            >
              <Input
                value={stateProductDetails.discount}
                onChange={handleOnchangeDetails}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input
                value={stateProductDetails.description}
                onChange={handleOnchangeDetails}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeImageDetails}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "50px",
                    }}
                    alt="img"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <div>Bạn có chắc chắn xóa sản phẩm này không!</div>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
