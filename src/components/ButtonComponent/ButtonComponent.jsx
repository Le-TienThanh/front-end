import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const ButtonComponent = (
  size,
  styleButton,
  styleTextButton,
  textButton,
  colorButton,
  disabled,
  ...rests
) => {
  return (
    <Button  
    style={{
      ...styleButton,
      background: disabled ? "#ccc" : styleButton.background,
    }}
    // icon = {<SearchOutlined color = {colorButton} style = {{color: "#fff"}} />}
    size={size}
    {...rests}
    
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
