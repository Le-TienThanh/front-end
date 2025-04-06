import React, { useState } from "react";
import { Input, Button } from "antd";
import { WrapperInputStyle } from "./style";
const InputForm = (props) => {
    const [valueInput, setValueInput] = useState(``)
    const {placeholder = 'Nhập text',isShowPassword, ...rest} = props
  return (
    
        <WrapperInputStyle placeholder={placeholder} valueInput= {valueInput} {...rest}/>

        
    
  );
};
export default InputForm;