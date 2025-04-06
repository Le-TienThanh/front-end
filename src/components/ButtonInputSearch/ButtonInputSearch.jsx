import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    bordered,
    backgroundColorInput = "#fff",
    backgroundColorButton = "#2c92e4",
    colorButton = "#fff"
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        
        style={{ backgroundColor: backgroundColorInput }}
      />
      <Button
        size={size}
        bordered={false}
        icon={<SearchOutlined style = {{color: colorButton}} />}
        style={{ backgroundColor: backgroundColorButton, border: !bordered && "none" }}
        textButton={textButton}
      >
        <span style = {{color : colorButton}} >{textButton}</span>
        </Button>
    </div>
  );
};

export default ButtonInputSearch;
