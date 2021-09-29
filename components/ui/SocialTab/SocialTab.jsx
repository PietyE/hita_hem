import React from "react";
import Image from "next/image";
import {
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import allabolagIcon from "../../../public/images/allabolag.svg";

import IconComponent from "components/ui/IconComponent";

const _data = {
  twitter: {
    name: "twitter",
    iconName: faTwitter,
  },
  facebook: {
    name: "facebook",
    iconName: faFacebookF,
  },
  instagram: {
    name: "instagram",
    iconName: faInstagram,
  },
  linkedin: {
    name: "linkedin",
    iconName: faLinkedin,
  },
};

const SocialTab = ({ socials = [], classNameContainer = "" }) => {
  return (
    <div className={`social_tab_container ${classNameContainer}`}>
      {socials.map((s, i) => {
        return (
          <a className="social_link" href={s.url} key={i}>
            {s.name !== "allabolag" ? (
              <IconComponent
                icon={_data[s.name].iconName}
                className="social_icon"
              />
            ) : (
              <Image
                src={allabolagIcon}
                alt="allabolag"
                className="social_icon"
              />
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialTab;
