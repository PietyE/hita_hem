const ImageComponent = ({ className = "", ...extra }) => {
  return (
    <div className={`image_container ${className}`}>
      <img loading="lazy" {...extra} />
    </div>
  );
};

export default ImageComponent;
