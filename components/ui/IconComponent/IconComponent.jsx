import { memo } from "react";
import dynamic from "next/dynamic";

const FontAwesomeIcon = dynamic(() =>
  import("@fortawesome/react-fontawesome").then((lib) => lib.FontAwesomeIcon)
);

const IconComponent = (props) => {
  return <FontAwesomeIcon {...props} />;
};

export default memo(IconComponent);
