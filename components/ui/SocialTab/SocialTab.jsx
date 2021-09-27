import React from "react";
import Image from "next/image";
import {
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import allabolagIcon from '../../../public/images/allabolag.svg';

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
      {socials.map((s) => {
        return (
            <a className = "social_link" href = {s.url} key = {s.name}>
              {s.name !== 'allabolag'
                  ?
                  <FontAwesomeIcon
                      icon = {_data[s.name].iconName}
                      className = "social_icon"
                  />
                  :
                <Image src={allabolagIcon} alt="allabolag" className="social_icon" />
              }
            </a>
        );
      })}
    </div>
  );
};

export default SocialTab;
