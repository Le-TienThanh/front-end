import { Menu } from "antd";
import React, { useState } from "react";
import {MailOutlined, AppstoreOutlined, UserOutlined} from "@ant-design/icons"
import { getItem } from "../../utils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
const AdminPage = () => {
    const items = [
        {
          key: 'sub1',
          icon: <UserOutlined />,
          label: 'Người dùng',
          children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
          ],
        },
        {
          key: 'sub2',
          icon: <AppstoreOutlined />,
          label: 'Sản phẩm',
          children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            
            
          ],
        },
       
      ];
  const rootSubmenuKeys = ["user", "product"];
  const [openKeys, setOpenKeys] = useState(["user"]);
  const [keySelected, setKeySelected] = useState("")
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleOnClick = ({key}) => {
    setKeySelected(key);

  }
  return (
    <>
        <HeaderComponent isHiddenSearch isHiddenCart/>
        <div style={{display: "flex"}}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{ width: "256px" }}
              items={items}
              onClick={handleOnClick}
            />
            <div style={{flex: "1"}}>
                {keySelected === "6" && <span>Key là 6</span>}
                <span>test </span>
    
            </div>
        </div>
    </>
  );
};
export default AdminPage;
