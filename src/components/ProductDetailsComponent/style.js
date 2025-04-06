import styled from "styled-components";
import { Col, Image, Input, InputNumber } from "antd";

export const WrapperStyleImageSmall = styled(Image)`
  height: 64px;
  width: 64px;
`;

export const WrapperStyleColImage = styled(Col)`
  flex-basis: unset;
  display: flex;
`;
export const WrapperStyleNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 300;
  line-height: 32px;
  word-break: break-word;
`;
export const WrapperStyleTextSell = styled.span`
  color: rgb(36, 36, 36);
  font-size: 15px;

  line-height: 24px;
`;
export const WrapperPriceProduct = styled.span`
  color: rgb(250, 250, 250);
  border-radius: 4px;
`;
export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  color: red;
  padding: 10px;
  margin-top: 10px;
  background-color: #ccc;
  
`;
export const WrapperAddressProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span.change-address {
    color: rgb(11, 116, 229);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;
export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: fit-content;
`;
export const WrapperBtnQualityProduct = styled.span`





`;
export const WrapperInputNumber = styled(Input)`
  &.ant-input.ant-input-outlined {
    width: 50px;
    border-radius: 0px;
    height: 20px;
    
    
  }
`;
