import { Divider, Modal, Radio, Table } from "antd";
 import React, { useState } from "react";
 import Loading from "../LoadingComponent/Loading";
 const ModalComponent = ({title = "Modal", isOpen = false, children, ...rest}) => {
   
   return (
    
      <Modal title={title} open={isOpen} {...rest}>
         {children}
      </Modal>
     
   );
 };
 
 export default ModalComponent;