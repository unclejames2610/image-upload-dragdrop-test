"use client";
import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loader2 = () => {
  return (
    <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#ddfbe8"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader2;
