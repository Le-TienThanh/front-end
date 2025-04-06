import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const ButtonComponent = (
  size,
  styleButton,
  styleTextButton,
  textButton,
  colorButton,
  ...rests
) => {
  return (
    <Button size={size} 
    style={styleButton}
    icon = {<SearchOutlined color = {colorButton} style = {{color: "#fff"}} />}
    {...rests}
    
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
