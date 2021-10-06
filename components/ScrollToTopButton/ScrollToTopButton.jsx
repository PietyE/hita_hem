import React, { useState, forwardRef, useEffect } from "react";
import throttle from 'lodash/throttle'

const ScrollToTopButton = forwardRef(({ className = "" }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = throttle(() => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 700) {
      setVisible(true);
    } else if (scrolled <= 700) {
      setVisible(false);
    }
  }, 500);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const classNameVisible = visible ? "visible" : "";

  return (
    <button
      className={`back_to_top_button ${className} ${classNameVisible}`}
      ref={ref}
      onClick={scrollToTop}
    >
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.48237 11.1833C1.63731 11.3395 1.82165 11.4635 2.02475 11.5482C2.22784 11.6328 2.44569 11.6763 2.66571 11.6763C2.88573 11.6763 3.10357 11.6328 3.30667 11.5482C3.50977 11.4635 3.6941 11.3395 3.84904 11.1833L9.33237 5.68333L9.33237 18.3333C9.33237 18.7754 9.50797 19.1993 9.82053 19.5118C10.1331 19.8244 10.557 20 10.999 20C11.4411 20 11.865 19.8244 12.1776 19.5118C12.4901 19.1993 12.6657 18.7754 12.6657 18.3333L12.6657 5.68333L18.149 11.1833C18.4629 11.4972 18.8885 11.6735 19.3324 11.6735C19.7762 11.6735 20.2019 11.4972 20.5157 11.1833C20.8295 10.8695 21.0059 10.4438 21.0059 10C21.0059 9.55616 20.8295 9.13051 20.5157 8.81667L12.1824 0.483337C12.0239 0.331601 11.837 0.212659 11.6324 0.133334C11.4329 0.0451595 11.2172 -0.00038614 10.999 -0.000386159C10.7809 -0.000386178 10.5652 0.0451594 10.3657 0.133334C10.1611 0.212659 9.97421 0.331601 9.81571 0.483336L1.48238 8.81667C1.32616 8.9716 1.20217 9.15594 1.11755 9.35904C1.03294 9.56214 0.989377 9.77998 0.989377 10C0.989377 10.22 1.03294 10.4379 1.11755 10.641C1.20217 10.8441 1.32616 11.0284 1.48237 11.1833Z"
          fill="white"
        />
      </svg>
    </button>
  );
});

export default ScrollToTopButton;
