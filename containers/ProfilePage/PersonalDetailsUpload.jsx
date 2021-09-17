import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import Button from "components/ui/Button";
import { useSelector } from "react-redux";
import { getProfile } from "redux/reducers/user";
import { isEqual } from "lodash";
import { useTranslation } from "react-i18next";

const PersonalDetailsUpload = ({ setFieldValue }) => {
  const { t } = useTranslation();
  const profile = useSelector(getProfile, isEqual);

  const imageEl = useRef(null);

  const onDrop = (file) => {
    setFieldValue("image", file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function imageChangeHandler(e) {
    let blob;
    if (e.target.dataset.value === "del") {
      setFieldValue("image", "");
    } else {
      setFieldValue("image", e.target.files[0]);
      blob = new Blob([e.target.files[0]]);
    }
    const preview = imageEl.current;
    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };
    if (blob) {
      reader.readAsDataURL(blob);
    } else {
      preview.src = "";
    }
  }

  return (
    <div className="profile_form_upload_avatar_settings">
      <div className="profile_form_upload_avatar_container">
        <div
          {...getRootProps()}
          className="profile_form_upload_avatar_circle"
          style={
            profile?.image
              ? {
                  backgroundImage: `url(${profile?.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
        >
          <input
            id="upload_file"
            {...getInputProps()}
            type="file"
            name="image"
            onChange={imageChangeHandler}
          />
          <img ref={imageEl} className="profile_form_upload_avatar" />
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
        htmlFor="upload_file"
        name="image"
        className="profile_form_upload_avatar_button_label"
      >
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
