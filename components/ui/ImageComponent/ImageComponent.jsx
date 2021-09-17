import React from "react";

const ImageComponent = ({ className = "", ...extra }) => {
  return (
    <div className={`image_container ${className}`}>
      <img {...extra} />
    </div>
  );
};

export default ImageComponent;
