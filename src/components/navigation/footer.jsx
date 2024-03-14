// import React from "react";
// import { Typography } from "@mui/material";
// import Link from "@mui/material/Link";

// const Footer = () => {
//   return (
//     <div>
//       <div style={{backgroundColor: "black", color: "white"}}>
//         <Typography variant={"body1"}>
//           © 2021{" "}
//           <Link href={"https://www.rungtacolleges.com/"} underline={"none"} color="inherit">
//             RSR RUNGTA COLLEGE
//           </Link>{" "}
//           All Rights Reserved.
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from 'react'
import { Typography } from '@mui/material'
import Link from '@mui/material/Link'

const Footer = () => {
    return (
        <div >
            <div
                style={{
                    paddingLeft: "10px",
                    paddingBottom: "10px",
                    backgroundColor: 'black',
                    color: 'white',
                    height: '30px',
                }}
            >
                <Typography variant={'body1'}>
                    © 2021{' '}
                    <Link
                        href={'https://www.rungtacolleges.com/'}
                        underline={'none'}
                        color="inherit"
                    >
                        <span
                            style={{
                                textDecoration: 'underline',
                                color: 'blue',
                                paddingTop: '20px',
                            }}
                        >
                            RSR Rungta College
                        </span>
                    </Link>{' '}
                    All Rights Reserved.
                </Typography>
            </div>
        </div>
    )
}

export default Footer
