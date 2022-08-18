import React, {useEffect, useRef, useState} from "react";
import {useDropzone} from "react-dropzone";
import Button from "components/ui/Button";
import {useSelector} from "react-redux";
import {getProfile} from "redux/reducers/user";
import isEqual from "lodash/isEqual";
import {useTranslation} from "react-i18next";
import useProfileErrorHandler from "../../customHooks/useProfileErrorHandler";

const PersonalDetailsUpload = ({setFieldValue, values}) => {
    const {t} = useTranslation();
    const profile = useSelector(getProfile, isEqual);
    const [hasAvatarUpload, setHasAvatarUpload] = useState(false);
    const [showWarning, setShowWarning] = useState(false)
    const imageEl = useRef(null);
    const errorHandlerHook = useProfileErrorHandler();

    const onDrop = (file) => {
        setFieldValue("image", file);
    };
    const avatarError = errorHandlerHook?.avatarError

    useEffect(() => {
        if (avatarError) {
            setShowWarning(false)
        }
    }, [avatarError])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    function imageChangeHandler(e) {
        let blob;
        if (showWarning) {
            setShowWarning(false)
        }
        if (avatarError) {
            errorHandlerHook.clearProfileErrorFromApi('image')
        }
        if (e?.target?.dataset?.value === "del") {
            setFieldValue("image", null);
            setHasAvatarUpload(false);

            return
        } else if (e?.target?.files[0]) {
            const imageFile = e?.target?.files[0]

            if (!imageFile.name.match(/\.(jpg|jpeg|png|webp)$/)) {
                setShowWarning(true)
                return
            }
            setFieldValue("image", imageFile);
            blob = new Blob([imageFile]);
        } else {
            return
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
                        alt={imageEl ? 'user avatar' : ' '}
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
                    colorStyle="dark-violet"
                    type="button"
                    className="profile_form_upload_avatar_button"
                >
                    &#43; {t("profile_page.personal.upload_photo")}
                </Button>
            </label>
            {(showWarning) && (
                <p className='profile_form_upload_avatar_warning'>{t("profile_page.personal.avatar_warning")}</p>
            )}
            {(avatarError) && (
                <p className='profile_form_upload_avatar_warning'>{avatarError}</p>
            )}
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
