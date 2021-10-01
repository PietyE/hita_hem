import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "components/ui/Button";
import { useSelector } from "react-redux";
import { getProfile } from "redux/reducers/user";
import isEqual from "lodash/isEqual";
import { useTranslation } from "react-i18next";

const PersonalDetailsUpload = ({ setFieldValue, values }) => {
    const { t } = useTranslation();
  const profile = useSelector(getProfile, isEqual);
  const [hasAvatarUpload, setHasAvatarUpload] = useState(false);

  const imageEl = useRef(null);

  const onDrop = (file) => {
    setFieldValue("image", file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function imageChangeHandler(e) {
    let blob;
    if (e.target.dataset.value === "del") {
      setFieldValue("image", null);
    } else {
      setFieldValue("image", e.target.files[0]);
      blob = new Blob([e.target.files[0]]);
    }
    const preview = imageEl.current;
    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      setHasAvatarUpload(true);
    };
    if (blob) {
      reader.readAsDataURL(blob);
    } else {
      preview.src = "";
      setHasAvatarUpload(false);
    }
  }

  return (
    <div className="profile_form_upload_avatar_settings">
      <div className="profile_form_upload_avatar_container">
        <div
          {...getRootProps()}
          className="profile_form_upload_avatar_circle"
          style={
            (profile?.image && (values?.image !== null))
              ? {
                  backgroundImage: `url(${profile?.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
        >
          <img
            ref={imageEl}
            className="profile_form_upload_avatar"
            loading="lazy"
            alt="user avatar"
            style={{
              display: hasAvatarUpload ? "flex" : "none",
            }}
          />
        </div>
        {profile?.first_name && profile?.second_name && (
          <p className="profile_form_name_mobile">
            {profile.first_name} {profile.second_name}
          </p>
        )}
        <Button
          colorStyle="link"
          type="button"
          className="profile_form_upload_avatar_button_remove profile_form_button_remove_mobile "
          data-value="del"
          onClick={imageChangeHandler}
        >
          {t("profile_page.personal.remove_photo")}
        </Button>
      </div>
      <label
        name="image"
        className="profile_form_upload_avatar_button_label"
      >
        <input
          {...getInputProps()}
          type="file"
          name="image"
          onChange={imageChangeHandler}
        />
        <Button
          colorStyle="dark-green"
          type="button"
          className="profile_form_upload_avatar_button"
        >
          &#43; {t("profile_page.personal.upload_photo")}
        </Button>
      </label>

      <Button
        colorStyle="link"
        type="button"
        className="profile_form_upload_avatar_button_remove"
        data-value="del"
        onClick={imageChangeHandler}
      >
        {t("profile_page.personal.remove_photo")}
      </Button>
    </div>
  );
};

export default PersonalDetailsUpload;
