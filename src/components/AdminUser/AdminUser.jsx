import React from "react";
import { WrapperHeader } from "./style";
import { Button } from "antd";
import { PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
const AdminUser = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
          }}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div>
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminUser;
