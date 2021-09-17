import React from "react";
import RaiseInstructionsBlock from "./RaiseInstructionsBlock";

const RaiseFeatures = (props) => {
  const content = {
    title: "Extra features",
    text: "nteger vitae justo eget magna fermentum iaculis eu. Duis tristique sollicitudin nibh sit amet commodo nulla. ",
    instructions: [
      {
        img: "",
        title: "Title 1",
        text: " Id donec ultrices tincidunt arcu. Ultricies mi eget mauris pharetra et. Tristique magna sit amet purus gravida quis blandit turpis cursus",
      },
      {
        img: "",
        title: "Title 2",
        text: "In a share issue, a company issues shares on our platform. Investors can subscribe to the shares to become shareholders of the company.",
      },
      {
        img: "",
        title: "Title 3",
        text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  ",
      },
    ],
  };
  return (
    <section className="raise_features_container">
      <RaiseInstructionsBlock content={content} />
    </section>
  );
};

export default RaiseFeatures;
