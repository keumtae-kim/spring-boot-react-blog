import React from 'react';

import styles from './Post.scss';
import classNames from 'classnames/bind';
import MarkdownRender from 'components/common/MarkdownRender';
const cx = classNames.bind(styles);

const Post = ({ post }) => {  
  if (post === undefined) {
    return null;
  }

  return (
    <div className={cx("post-preview")}>
      <a>
        <h2 className={cx("post-title")}>
          {post.get("title")}
        </h2>
        <MarkdownRender markdown={post.get("body")} />
      </a>
      <p className={cx("post-meta")}>Posted by < a>{post.get("createdBy") + " "}</a>{post.get("lastModifiedDate")}</p>
    </div>
  )
};

export default Post;