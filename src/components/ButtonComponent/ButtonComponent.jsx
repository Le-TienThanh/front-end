import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const ButtonComponent = (
  size,
  styletextbutton,
  stylebutton,
  textbutton,
  colorButton,
  disabled,
  ...rests
) => {
  return (
    <Button
      style={{
        ...stylebutton,
        background: disabled ? "#ccc" : styletextbutton.background,
      }}
      // icon = {<SearchOutlined color = {colorButton} style = {{color: "#fff"}} />}
      size={size}
      {...rests}
    >
      <span style={styletextbutton}>{textbutton}</span>
    </Button>
  );
};

export default ButtonComponent;
