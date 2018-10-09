import React, { Fragment } from 'react';

import styles from './Post.scss';
import classNames from 'classnames/bind';
import MarkdownRender from 'components/common/MarkdownRender';
import moment from 'moment';
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col
} from 'reactstrap';
const cx = classNames.bind(styles);

const Post = ({ post }) => {
  if (post === undefined) {
    return null;
  }

  return (
    <Fragment>
      <a>
        <div className={cx("post-header")}>
          <h2 className={cx("post-title")}>
            <Link to={"/posts/" + post.get("id")}>{post.get("title")}</Link>
          </h2>
          <p className={cx("post-meta")}>
            Posted by < a>{post.get("createdBy") + " "}</a>{moment(post.get("lastModifiedDate")).format("lll")}
          </p>
        </div>
        <MarkdownRender markdown={post.get("body")} />
        <hr />
      </a>
    </Fragment>
  )
};

export default Post;