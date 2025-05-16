import styled from "styled-components";
import {Radio} from "antd";
export const WrapperStyleHeader = styled.div`
    background: rgb(255, 255, 255);
    padding 9px 16px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    span{
        font-size: 16px;
        font-weight: 500;
        color: rgb(36, 36, 36);
    }
    `;
export const WrapperContainer = styled.div`
  width: 100%;
`;
export const WrapperListOrder = styled.div``;
export const WrapperItemOrder = styled.div`
  display: flex;

  align-items: center;
  padding: 9px 16px;
  background: rgb(255, 255, 255);
  margin-top: 12px;
  justify-content: center;
`;
export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 255 ,255);
  padding: 10px;
  font-size: 15px;
  width: fit-content;
  border-radius: 5px;
  margin-top: 5px;
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #ccc;
  background: rgb(255, 255, 255);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  width: 90%;
  
`;


export const WrapperItemOrderInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #ccc;
  background: rgb(255, 255, 255);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  width: 90%;
  display: flex;
  justify-content: center;
  
`

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: rgb(255, 255, 255);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 90%
`;
export const Label = styled.span`
font-size: 20px;
color: #000;
font-weight: bold;


`

export const WrapperRadio = styled(Radio.Group)`
margin-top: 6px;
background: rgb(240, 248, 255);
border: 1px solid rgb(194, 255, 255);
width: 500px;
border-radius: 5px;
height: 150px;
padding: 16px;
font-weight: normal;
display: flex;
flex-direction: column;
gap: 10px;
justify-content: center;

`
export const WrapperRadioPayment = styled(Radio.Group)`
margin-top: 6px;
background: rgb(240, 248, 255);
border: 1px solid rgb(194, 255, 255);
width: 500px;
border-radius: 5px;
height: 50px;
padding: 16px;
font-weight: normal;
display: flex;
flex-direction: column;
gap: 10px;
justify-content: center;

`