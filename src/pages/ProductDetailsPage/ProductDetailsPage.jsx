import react from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  return (
    <div style={{padding: '0 120px', background: '#fff', height: '1000px', width: "80%"}} >
      <h2><span style={{cursor: "pointer", fontWeight: "bold"}} onClick={() => {navigate("/")}}>Trang chủ</span> - Chi tiết sản phẩm</h2>
      <ProductDetailsComponent idProduct={id}/>
    </div>
  );
};
export default ProductDetailsPage;
