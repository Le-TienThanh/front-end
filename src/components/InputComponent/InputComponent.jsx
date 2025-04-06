import React from "react";
import { Input, Button } from "antd";
const InputComponent = ({size, placeholder, bordered, style, ...rest}) => {
  return (
    <Input 
      placeholder={placeholder} 
      size={size}  
      style={style} 
        {...rest}
      />
  );
};
export default InputComponent;
