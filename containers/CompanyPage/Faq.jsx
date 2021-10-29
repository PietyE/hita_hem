import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import CommentBlock from "./CommentBlock";
import Button from "components/ui/Button";
import iconMessage from "public/images/message.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getFaqUsersPostsSelector,
  getCompanyIdSelector,
} from "redux/reducers/companies";
import isEqual from "lodash/isEqual";
import { addFaqPost, getFaqPosts } from "redux/actions/companies";
import { useTranslation } from "react-i18next";
// import {filterComments} from "../../utils/restrictInput";

const Faq = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const posts = useSelector(getFaqUsersPostsSelector, isEqual);
  const companyId = useSelector(getCompanyIdSelector, isEqual);
  const _getFaqPosts = useCallback(() => {
    dispatch(getFaqPosts());
  }, [dispatch]);
  const _addFaqPost = useCallback(
    (id) => {
      dispatch(addFaqPost(id));
    },
    [dispatch]
  );

  useEffect(() => {
    _getFaqPosts();
  }, [_getFaqPosts, companyId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e?.target[0]?.value) {
      // _addFaqPost(filterComments(e.target[0].value));
      _addFaqPost(e.target[0].value);

      e.target[0].value = "";
    }
  };
  return (
    <section className="faq">
      <ul className="faq_comments_list">
        {((posts && posts?.length === 0) || !posts) && (
          <p className="faq_comments_answer">
            {t("company_page.faq.faq_text")}
          </p>
        )}
        {posts &&
          posts?.length > 0 &&
          posts?.map((comment) => (
            <CommentBlock key={comment.id} item={comment} />
          ))}
      </ul>
      <div className="faq_post_block">
        <h3 className="faq_post_title">{t("company_page.faq.faq_title")}</h3>
        <form className="faq_post_form" onSubmit={handleSubmit}>
          <textarea className="faq_post_input"></textarea>
          <Button
            type="submit"
            colorStyle="dark-green"
            className="faq_post_button"
          >
            {t("company_page.faq.button_send")}
          </Button>
          <Button
            type="submit"
            colorStyle="blue"
            className="faq_post_button_small"
          >
            <Image src={iconMessage} alt="message" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Faq;
