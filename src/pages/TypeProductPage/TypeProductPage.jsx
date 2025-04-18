import react, { Fragment } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrappeNavbar, WrappeProducts } from "./style";

const TypeProductPage = () => {
  const onChange = () =>{

  }
  return (
    <div style = {{padding: '0 120px', background: '#fff'}} >
      <Row style = {{ flexWrap: 'nowrap', paddingTop: '10px'}}>
        <WrappeNavbar span={4}  >
          <NavbarComponent />
        </WrappeNavbar>
        <Col span={20} >
          <WrappeProducts >
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrappeProducts>
          <Pagination  defaultCurrent={2} total={100} onChange={onChange} style={{textAlign: 'center', marginTop: '10px'}} />
        </Col>
        
      </Row>
      
    </div>
  );
};
export default TypeProductPage;
