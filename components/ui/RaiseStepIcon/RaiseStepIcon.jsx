import React from "react";
import { useTranslation } from "react-i18next";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import IconComponent from "components/ui/IconComponent";

const RaiseStepIcon = ({ number = 1, formNumber = 1 }) => {
  const { t } = useTranslation();
  let status = "";
  if (number === formNumber) {
    status = "active";
  } else if (number < formNumber) {
    status = "success";
  } else if (number > formNumber) {
    status = "";
  }

  let container = "step_icon_container";
  let dotsStyle = "raise_step_dots"
  let bgCircleStyle = "step_icon_bg-circle_hide";
  let circleStyle = "step_icon_circle_not-active";
  let description = "step_icon_description";
  if (status === "success") {
    circleStyle = "step_icon_circle_active";
    dotsStyle = "raise_step_dots-active"
    container = "step_icon_container_active-dots";
    description = "step_icon_description";
  }
  if (status === "active") {
    circleStyle = "step_icon_circle_active";
    bgCircleStyle = "step_icon_bg-circle";
    description = "step_icon_description_active";
  }
  const CircleContent = () => {
    switch (status) {
      case "success":
        return <IconComponent icon={faCheck} />;
      case "active":
        return `${number}`;
      case "":
        return `${number}`;
      default:
        return null;
    }
  };

  return (
      <>
    <div className={container}>
      <div className={bgCircleStyle}>
        <div className={circleStyle}>
          <CircleContent />
        </div>
      </div>
      <p className={description}>
        {t("raisePage.raise_step_icon")} {number}
      </p>

    </div>
        <span className={dotsStyle}>........</span>
        </>
  );
};

export default RaiseStepIcon;
