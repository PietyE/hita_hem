import React from "react";

import Link from "next/link";

const Logo = ({ classNameContainer, classNameText, type }) => {
  return (
    <Link href="/" prefetch={false}>
      <a className={`logo_container ${classNameContainer}`}>
        <div className="logo_circle">
          <svg
            width="34"
            height="32"
            viewBox="0 1.5 34 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10.9844"
              y="4.52539"
              width="9.05091"
              height="29.4155"
              rx="4.52546"
              transform="rotate(-30 10.9844 4.52539)"
              fill="#89CFF0"
            />
            <rect
              opacity="0.7"
              x="4.79883"
              y="24.3125"
              width="9.05091"
              height="24.7188"
              rx="4.52546"
              transform="rotate(-90 4.79883 24.3125)"
              fill="#FB7F73"
            />
            <rect
              x="15.4805"
              width="9.05091"
              height="29.4155"
              rx="4.52546"
              transform="rotate(30 15.4805 0)"
              fill="#1F607C"
            />
            <path
              opacity="0.6"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.9717 3.76C21.8403 5.13588 21.9354 6.93521 21.0654 8.44215L17.1467 15.2295L13.2281 8.44226C11.9785 6.27777 12.7201 3.51004 14.8846 2.26037C15.0897 2.14193 15.3003 2.04137 15.5145 1.95822C16.0129 1.7659 16.5435 1.66209 17.0802 1.65376C17.6938 1.64522 18.3021 1.76179 18.8665 1.99312C19.0506 2.06903 19.2318 2.15798 19.409 2.26026C20.0113 2.60801 20.5034 3.07331 20.8731 3.61046C20.9068 3.65946 20.9397 3.70931 20.9717 3.76Z"
              fill="#89CFF0"
            />
          </svg>
        </div>

        {type !== 'header' && <span className = {`logo_text ${classNameText}`}>Accumeo</span>}
      </a>
    </Link>
  );
};

export default Logo;
