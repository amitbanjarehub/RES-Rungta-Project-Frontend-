import React from "react";
import {Outlet} from "react-router-dom"

function AuthContainer(props) {
  const { children } = props;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2  w-[90%] h-[90%] bg-secondary rounded-3xl flex justify-evenly overflow-hidden md:m-10">
        <div className=" bg-primary/20 hidden lg:flex w-full justify-center items-center">
          <img
            src="https://myrungta.com/erp/SRGI_LOGO_round.png"
            className="h-1/2"
            alt=""
          />
        </div>
        <div className="w-full"><Outlet/></div>
      </div>
    </div>
  );
}

export default AuthContainer;
