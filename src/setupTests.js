// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

//////////////////////////////////////////////////////////////////////////////
// const AdminProduct = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCreate, setIsCreate] = useState(false);
//   const [form] = Form.useForm();
//   const fetchAllTypeProduct = async () => {
//     const response = await ProductService.getAllTypeProduct();
//     return response;
//   };
//   const getAllProducts = async () => {
//     const res = await ProductService.getAllProduct();
//     return res;
//   };
//    const mutation = useMutationHooks((data) => {
//       const { name, price, description, rating, image, type, countInStock } =
//         data;
//       const res = ProductService.createProduct({
//         name,
//         price,
//         description,
//         rating,
//         image,
//         type,
//         countInStock,
//       });
//       return res;
//     });
//     const { data, isLoading, isSuccess, isError } = mutation;
//   const queryProduct = useQuery({
//     queryKey: ["products"],
//     queryFn: getAllProducts,
//   });
//   const typeProduct = useQuery({
//     queryKey: ["type-products"],
//     queryFn: fetchAllTypeProduct,
//   });
//   const [stateProduct, setStateProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     rating: "",
//     image: "",
//     type: "",
//     countInStock: "",
//     newType: "",
//   });
//   const onFinish = () => {
//     const params = {
//       name: stateProduct.name,
//       price: stateProduct.price,
//       description: stateProduct.description,
//       rating: stateProduct.rating,
//       image: stateProduct.image,
//       type:
//         stateProduct.type === "add_type"
//           ? stateProduct.newType
//           : stateProduct.type,
//       countInStock: stateProduct.countInStock,
//     };
//     mutation.mutate(params, {
//       // onSuccess: (data) => {
//       //   messageProduct.success("Thêm sản phẩm thành công!");
//       // },
//       // onError: (error) => {
//       //   messageProduct.error("Đã xảy ra lỗi khi thêm sản phẩm!");
//       //   console.error(error);
//       // },
//       onSettled: () => {
//         queryProduct.refetch();
//       },
//     });
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setStateProduct({
//       name: "",
//       price: "",
//       description: "",
//       rating: "",
//       image: "",
//       type: "",
//       countInStock: "",
//     });
//     form.resetFields();
//   };
//   const handleOnchange = (e) => {
//     setStateProduct({
//       ...stateProduct,
//       [e.target.name]: e.target.value,
//     });
    
//   };
//   const handleChangeSelect = (value) => {
//     setStateProduct({
//       ...stateProduct,
//       type: value,
//     });
//   };
//   return (
//     <ModalComponent
//       title="Tạo sản phẩm"
//       open={isModalOpen}
//       onCancel={handleCancel}
//       footer={null}
//     >
//       <Loading isLoading={isCreate}>
//         <Form
//           name="basic"
//           labelCol={{ span: 6 }}
//           wrapperCol={{ span: 18 }}
//           style={{ maxWidth: 600 }}
//           onFinish={onFinish}
//           autoComplete="on"
//           form={form}
//         >
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: "Please input your name!" }]}
//           >
//             <Input
//               value={stateProduct.name}
//               onChange={handleOnchange}
//               name="name"
//             />
//           </Form.Item>

//           <Form.Item
//             label="Type"
//             name="type"
//             rules={[{ required: true, message: "Please input your type!" }]}
//           >
//             <Select
//               name="type"
//               value={stateProduct.type}
//               onChange={handleChangeSelect}
//               options={renderOptions(typeProduct?.data?.data)}
//             />
//           </Form.Item>
//           {stateProduct.type === "add_type" && (
//             <Form.Item
//               label="New type"
//               name="newType"
//               rules={[{ required: true, message: "Please input your type!" }]}
//             >
//               <Input
//                 value={stateProduct.newType}
//                 onChange={handleOnchange}
//                 name="newType"
//               />
//             </Form.Item>
//           )}

//           <Form.Item
//             label="Count InStock"
//             name="countInStock"
//             rules={[
//               { required: true, message: "Please input your count inStock!" },
//             ]}
//           >
//             <Input
//               value={stateProduct.countInStock}
//               onChange={handleOnchange}
//               name="countInStock"
//             />
//           </Form.Item>
//           <Form.Item
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: "Please input your price!" }]}
//           >
//             <Input
//               value={stateProduct.price}
//               onChange={handleOnchange}
//               name="price"
//             />
//           </Form.Item>
//           <Form.Item
//             label="Rating"
//             name="rating"
//             rules={[{ required: true, message: "Please input your rating!" }]}
//           >
//             <Input
//               value={stateProduct.rating}
//               onChange={handleOnchange}
//               name="rating"
//             />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[
//               { required: true, message: "Please input your description!" },
//             ]}
//           >
//             <Input
//               value={stateProduct.description}
//               onChange={handleOnchange}
//               name="description"
//             />
//           </Form.Item>
//           <Form.Item
//             label="Image"
//             name="image"
//             rules={[{ required: true, message: "Please input your image!" }]}
//           >
//             <WrapperUploadFile onChange={handleOnchangeImage} maxCount={1}>
//               <Button icon={<UploadOutlined />}>Select File</Button>
//               {stateProduct?.image && (
//                 <img
//                   src={stateProduct?.image}
//                   style={{
//                     height: "60px",
//                     width: "60px",
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                     marginLeft: "50px",
//                   }}
//                   alt="img"
//                 />
//               )}
//             </WrapperUploadFile>
//           </Form.Item>

//           <Form.Item label={null}>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Loading>
//     </ModalComponent>
//   );
// };
// export default AdminProduct;
