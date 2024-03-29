import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "next/image";
import {recaptcha} from "../../utils/recaptcha";
import {
  getMainDescriptionSelector,
  getMainImageSelector,
  getMainTitleSelector,
} from "redux/reducers/launchingSoon";
import isEqual from "lodash/isEqual";
import { validateEmail } from "utils/utils";
import { addEmail } from "redux/actions/aboutUs";
import IconTriangle from "./images/triangle.svg";
import { useTranslation } from "react-i18next";

const ImageBlock = ({ onOpenModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const title = useSelector(getMainTitleSelector, isEqual);
  const description = useSelector(getMainDescriptionSelector, isEqual);
  const image = useSelector(getMainImageSelector, isEqual);

  const _addEmail = useCallback(
    (email) => {
      dispatch(addEmail(email));
    },
    [dispatch]
  );



  const handleClickSubscribe = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      recaptcha('launching_soon_subscribe', _addEmail, email)
      // _addEmail(email);
      setEmail("");
      onOpenModal(true);
    } else {
      setShowWarning(true);
    }
  };
  const handleChangeEmail = (e) => {
    if (showWarning || email === "") {
      setShowWarning(false);
    }
    setEmail(e.target.value);
  };
  const formBorderStyle = showWarning ? 'launching_soon_image_subscribe_form_warning' : 'launching_soon_image_subscribe_form'
  const inputBorderStyle = showWarning ? 'launching_soon_image_subscribe_form_input_warning' : 'launching_soon_image_subscribe_form_input'


  return (
    <div
      className="launching_soon_image_block"
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      <div className="launching_soon_image_top_block">
        <div className="launching_soon_image_top_bg_block"></div>
        <div className="launching_soon_image_top_content_block">
          {title && (
            <>
              <span className="launching_soon_image_top_block_title">
                {title}
              </span>
                {/*<Image*/}
                {/*    src={IconTriangle}*/}
                {/*    alt="icon_triangle"*/}
                {/*    className="launching_soon_image_top_block_icon"*/}
                {/*/>*/}
              <svg className="launching_soon_image_top_block_icon" width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5977 13.3689L0.776823 26.7151L0.776825 0.0226736L27.5977 13.3689Z" fill="#E0719E"/>
              </svg>
              <svg className="launching_soon_image_top_block_icon2" width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5977 13.3689L0.776823 26.7151L0.776825 0.0226736L27.5977 13.3689Z" fill="#E0719E"/>
              </svg>
              {/*<Image*/}
              {/*      src={IconTriangle}*/}
              {/*      alt="icon_triangle"*/}
              {/*      className="launching_soon_image_top_block_icon2"*/}
              {/*  />*/}
            </>
          )}
          {description && (
            <p className="launching_soon_image_top_block_text">{description}</p>
          )}
        </div>
      </div>
      <div className="launching_soon_image_subscribe_block">
        <div className="launching_soon_image_subscribe_bg_block"></div>
        <div className="launching_soon_image_subscribe_input_block">
          <InputGroup className={formBorderStyle}>
            <FormControl
              placeholder={t("launching_soon_page.email_placeholder")}
              className={inputBorderStyle}
              value={email}
              onChange={handleChangeEmail}
            />
            <button
              className="launching_soon_image_subscribe_form_button g-recaptcha"
              action='launching_soon_subscribe'
              onClick={handleClickSubscribe}
            >
              {t("launching_soon_page.image_block_button")}
            </button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default ImageBlock;
