import React from "react";

const ImageComponent = React.forwardRef((props, ref) => {
  const { className = "", ...extra } = props;
  return (
    <div className={`image_container ${className}`} ref={ref}>
      <img loading="lazy" {...extra} />
    </div>
  );
});

export default ImageComponent;
