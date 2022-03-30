import React, { useState } from "react";
import FaqResponseModalWindow from "./FaqResponseModalWindow";
import Button from "components/ui/Button";
import { useSelector } from "react-redux";
import { getSelectedLangSelector } from "redux/reducers/language";
import { getIsOwnerSelector } from "redux/reducers/companies";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const dataOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const CommentItem = ({ data, className, complete }) => {
  const { t } = useTranslation();

  const [selectedPost, setSelectedPost] = useState(null);

  const currentLanguage = useSelector(getSelectedLangSelector);
  const isOwner = useSelector(getIsOwnerSelector);

  const setShowModal = (value) => {
    setSelectedPost(value);
  };

  const _date = new Date(data?.date).toLocaleString(
    currentLanguage,
    dataOptions
  );
  return (
    <>
      <div className={`comment_item ${className}`}>
        <div className="comment_item_image" >
          {data?.user?.image && (
            // <img src={data?.user?.image} alt="user_avatar" loading="lazy" />
              <Image
                  src = {data?.user?.image}
                  layout = "fill"
                  objectFit = "cover"
                  // priority = {true}
                  alt = {data?.user?.image ? 'User avatar' : ' '}
              />
          )}
        </div>
        <div className="comment_item_text_wrapper">
          <h3 className="comment_item_name">
            {data?.user ? `${data?.user?.first_name} ${data?.user?.second_name}`: t("company_page.faq.deleted_user")}
          </h3>
          {!data.question && <p className="comment_item_date">{_date}</p>}
          {data.question && (
            <p className="comment_item_date">
              {t("company_page.faq.faq_manager")}
            </p>
          )}

          <p className="comment_item_text">{data?.description}</p>
          {isOwner && data?.user && !data.question && !complete && (
            <Button
              colorStyle="outline-green"
              className="comment_item_button"
              onClick={() => setShowModal(data.pk)}
            >
              {t("company_page.faq.button")}
            </Button>
          )}
        </div>
      </div>
      <FaqResponseModalWindow
        show={!!selectedPost}
        handleClose={setSelectedPost}
        postId={selectedPost}
      />
    </>
  );
};

export default CommentItem;
