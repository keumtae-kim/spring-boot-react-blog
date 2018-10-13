import React, { Fragment } from 'react';

import styles from './PostPreview.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom'


const cx = classNames.bind(styles);


const PostPreview = ({ post }) => {
  if (post === undefined) {
    return null;
  }
  let postBody = post.get("body");
  if (postBody.length > 300) {
    postBody = postBody.substring(0, 300) + '...';
  }

  return (
    <Fragment>
      <div className={cx("post-header")}>
        <h2 className={cx("post-title")}>
          <Link to={"/posts/" + post.get("id")}>{post.get("title")}</Link>
        </h2>
        <div className={cx("post-meta")}>
          Posted by {post.get("createdBy")}
          <span> {`  `} </span>
          {moment(post.get("lastModifiedDate")).format("lll")}
        </div>
        <hr />
      </div>
      <div className={cx('post-body')}>{renderHTML(postBody)}</div>
    </Fragment>
  )
};

export default PostPreview;