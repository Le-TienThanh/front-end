import { Upload } from "antd";
import styled from "styled-components";
export const WrapperHeader = styled.h1`
color: #000;
font-size: 14px;
font-family: "Arial", sans-serif;

`
export const WrapperUploadFile = styled(Upload)`
& .ant-upload.ant-upload-select{
display: flex;
align-items: center;
justify-content: center;
}

`