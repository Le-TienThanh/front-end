import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 16px;
  font-family: "Arial", sans-serif;
  margin: 4px 0;
`;
export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 5px;
  gap: 30px;
`;
export const WrapperLabel = styled.label`
  font-size: 12px;
  font-family: "Arial", sans-serif;
  color: #000;
  font-weight: 600;
  width: 50px;
  text-align: left;
`;
export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload-list-item.ant-upload-list-item-error {
    display: none;
  }
`;
