import React from "react";
 import { Input, Button, Drawer } from "antd";
 const DrawerComponent = ({title=  "Drawer" , placement = "right ",children, isOpen = false, ...rests}) => {
   return (
     <>
     <Drawer title={title} placement={placement}  open={isOpen} {...rests}>
         {children}
 
     </Drawer>
     </>
 
   );
 };
 export default DrawerComponent;