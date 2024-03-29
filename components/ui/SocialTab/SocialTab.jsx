import React from "react";
import {
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

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

const SocialTab = ({ socials = [], classNameContainer = "", type = "" }) => {
  return (
    <div className={`social_tab_container ${classNameContainer}`}>
      {socials.map((s, i) => {
        return (
          <a className="social_link" href={s.url} key={i}>
            {s.name !== "allabolag" ? (
                <>
              <IconComponent
                icon={_data[s.name]?.iconName}
                className="social_icon"
              />
              {/*{type === "campaign_socials" && (*/}
              {/*<span className="social_text">{s.name}</span>*/}
              {/*)}*/}
              </>
            ) : (
                <>
                <svg
                    className="social_icon"
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M16.9364 3.05492C13.1004 -0.779033 6.88441 -0.781017 3.0465 3.05492C-0.789438 6.89085 -0.787465 13.1089 3.04847 16.9448C4.96445 18.8608 7.47349 19.8188 9.9845 19.8208V23.8947L16.8769 17.0003L16.9344 16.9428C20.7723 13.1069 20.7703 6.89085 16.9364 3.05492ZM14.2766 14.8721C11.8489 17.0142 8.12999 17.0162 5.70427 14.8721C2.87195 12.371 2.77079 8.04124 5.40279 5.40924C7.9376 2.87443 12.0473 2.87443 14.5821 5.40924C17.2121 8.04124 17.1109 12.3691 14.2766 14.8721Z"
                      fill="white"
                  />
                  <path
                      d="M7.59259 7.77738C6.44816 9.01106 6.44618 10.9806 7.59061 12.2163C8.85802 13.5868 10.9961 13.6166 12.3032 12.3095C13.5805 11.0322 13.5805 8.96346 12.3032 7.68614C10.9961 6.38105 8.86 6.4108 7.59259 7.77738Z"
                      fill="white"
                  />
                </svg>
                  {/*{type === "campaign_socials" && (*/}
                  {/*    <span className="social_text">AllaBolag</span>*/}
                  {/*)}*/}
                </>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialTab;
