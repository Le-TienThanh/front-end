import styled from "styled-components";
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
export const WrapperStyleHeaderDelivery = styled.div`
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
        margin-bottom: 4px;
    `;
export const WrapperLeft = styled.div`
  width: 910px;
`;
export const WrapperListOrder = styled.div``;
export const WrapperItemOrder = styled.div`
  display: flex;

  align-items: center;
  padding: 9px 16px;
  background: rgb(255, 255, 255);
  margin-top: 12px;
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

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #ccc;
  background: rgb(255, 255, 255);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  width: 100%;
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: rgb(255, 255, 255);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 100%;
`;
