import React from "react";
import { useSelector } from "react-redux";

import {
  getMainSubTitleSelector,
  getMainPostsSelector,
} from "redux/reducers/launchingSoon";
import isEqual from "lodash/isEqual";

const PostsBlock = () => {
  const title = useSelector(getMainSubTitleSelector, isEqual);
  const posts = useSelector(getMainPostsSelector, isEqual);

  const sortedByIndexPosts = posts.sort((a, b) => a.index - b.index);
  return (
    <div className="launching_soon_posts_block">
      <h2 className="launching_soon_posts_block_title">{title}</h2>
      <ul className="launching_soon_posts_list">
        {sortedByIndexPosts.map((post) => {
          return (
            <li key={post.index} className="launching_soon_posts_item">
              <h3 className="launching_soon_posts_item_title">
                <span className="launching_soon_posts_item_title-red">
                  {post.index}
                  {". "}
                </span>

                {post.title}
              </h3>
              <p className="launching_soon_posts_description">
                {post.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostsBlock;
