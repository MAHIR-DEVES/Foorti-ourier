
"use client";
import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#00b795" size={60} />
    </div>
  );
};

export default Loading;
