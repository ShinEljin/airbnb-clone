"use client";

import { RingLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <RingLoader size={100} color="blue" />
    </div>
  );
};

export default PageLoader;
