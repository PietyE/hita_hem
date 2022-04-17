import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import TabBar from "components/ui/TabBar";
import Invest from "./Invest";
import Raise from "./Raise";

const InstructionSection = () => {
  const { t } = useTranslation();

  const [chosen, setChosen] = useState("invest");
  const handleClick = (key) => {
    setChosen(key);
  };

  const TabContent = () => {
    switch (chosen) {
      case "invest":
        return <Invest />;
      case "raise":
        return <Raise />;
      default:
        return null;
    }
  };

  return (
    <section className="instructions_container">
      <div className="instructions_tab-bar_wrapper">
        <TabBar
          data={[
            { name: t("home_page.invest"), key: "invest" },
            { name: t("home_page.raise"), key: "raise" },
          ]}
          onClick={handleClick}
          selectedKey={chosen}
          className="instructions_tab-bar"
        />
      </div>
      <TabContent />
    </section>
  );
};

export default InstructionSection;
