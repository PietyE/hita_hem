import React from "react";
import {
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  socials = [
    {
      url: "https://linkedin.com",
      name: "linkedin",
    },
    {
      url: "https://twitter.com",
      name: "twitter",
    },
    {
      url: "https://facebook.com",
      name: "facebook",
    },
    {
      url: "https://instagram.com",
      name: "instagram",
    },
  ];
  return (
    <div className={`social_tab_container ${classNameContainer}`}>
      {socials.map((s) => {
        return (
          <a className="social_link" href={s.url} key={s.name}>
            <FontAwesomeIcon
              icon={_data[s.name].iconName}
              className="social_icon"
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialTab;
