import React from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";
import { getFaqAllPostsSelector } from "redux/reducers/companies";
import isEqual from "lodash/isEqual";

const CommentBlock = ({ item }) => {
  const allPosts = useSelector(getFaqAllPostsSelector, isEqual);
  const answer = allPosts.find((el) => el.question === item.pk);

  return (
    <li className="faq_comment_item">
      <div className="faq_post">
        <CommentItem data={item} type="post" complete={!!answer} />
      </div>
      {answer && (
        <div className="faq_answer">
          <CommentItem data={answer} className="answer" />
        </div>
      )}
    </li>
  );
};

export default CommentBlock;
