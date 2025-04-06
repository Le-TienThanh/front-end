// import react from "react";
// import HeaderComponent from "../HeaderComponent/HeaderComponent";

// const DefaultComponent = ({ children }) => {
//   return (
//     <div>
//       <HeaderComponent />
//       {children}
//     </div>
//   );
// };
// export default DefaultComponent;

import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const DefaultComponent = ({ children, stylesHeader, stylesBody }) => {
  return (
    <div >
      <HeaderComponent style={stylesHeader} />
      <div style={stylesBody}>
        {children}
      </div>
    </div>
  );
};

export default DefaultComponent;

