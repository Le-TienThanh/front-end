// import { Spin } from "antd";
// import React, { useState } from "react";
// const Loading = ({children, isLoading, delay = 200}) => {
//     return (
//         <Spin spinning = {isLoading} delay = {delay}>
//             {children}
//         </Spin>
//     )

  
// }
// export default Loading;


import React from 'react';
import { Spin } from 'antd';
const Loading = ({children, isLoading, delay = 200}) => {
    return(
        <Spin spinning={isLoading}  delay={delay}>
            {children}

        </Spin>
    )
};
export default Loading;
// chat gpt
// import React from "react";
// import { Spin } from "antd";

// const Loading = ({ children, isLoading, delay = 200}) => {
//   return (
//     <Spin spinning={isLoading} delay={delay} >
//       {children}
//     </Spin>
//   );
// };

// export default Loading;
