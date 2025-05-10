import styled from "styled-components";

export const WrapperTypeProduct = styled.div`
  display: flex;
  gap:12px;
  margin-top:10px;
  margin-bottom: 10px;
  font-size: 20px
`;

export const WrapperButtonMore = styled.button`
    background-color: #fff;
  color: rgb(11, 116, 229);
  border: 1px solid rgb(11, 116, 229);
  width: 240px;
  height: 38px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
  font-weight: 500;

  &:hover {
    background-color: rgb(11, 116, 229);
    color: #fff;
    
  }
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointers")};
  
    


`;
export const WrappeProducts = styled.div`
  display: flex;
  
  gap: 15px;
  
  margin-top: 50px;
  flex-wrap: wrap;

  
`;
