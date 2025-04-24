import { Row } from "antd";
import styled from "styled-components";
// box header
export const WrapperHeader = styled(Row)`
  background-color: #43e8e4;
  padding: 10px 120px;
  gap: 16px;
  flex-wrap: nowrap
  
`;
// left header: text
export const TextWrapperHeader = styled.span`
  font-size: 30px;
  color: white;
  font-weight: bold;
  text-align: left;
  align-items: center;
  
  
`;

export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`;
export const WrapperContentPopup = styled.p`
cursor: pointer;
&:hover{
background: rgb(44, 146, 228);
color: #fff
}


`