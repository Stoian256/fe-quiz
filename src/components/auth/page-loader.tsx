import React from "react";

export const PageLoader: React.FC = () => {
  const loadingImg = "https://i.gifer.com/YCZH.gif";

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-100 h-auto flex justify-center items-center">
        <img src={loadingImg} alt="Loading..." className="w-full h-full " />
      </div>
    </div>
  );
};
