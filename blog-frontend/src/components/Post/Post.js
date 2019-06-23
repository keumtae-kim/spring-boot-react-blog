import classNames from 'classnames/bind';
import moment from 'moment';
import React, { Fragment } from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import CommentList from '../CommentList/CommentList';
import styles from './Post.scss';


const cx = classNames.bind(styles);

const Post = ({ post, comments, deletePost, isAuthenticated, currentUser, writeComment }) => {
  if (post === undefined) {
    return null;
  }

  return (
    <Fragment>
      <div className={cx("post-wrapper")}>
        <div className={cx("post-header")}>
          <h2 className={cx("post-title")}>
            <Link to={"/posts/" + post.get("id")}>{post.get("title")}</Link>
            {
              isAuthenticated && post.get("userId") === currentUser.get("id") && <span className={cx('post-button')}>
                <Button className={cx('post-button')} color='info' size='sm' tag={Link} to={'/editor/' + post.get('id')}>EDIT</Button>
                <Button className={cx('post-button')} color='danger' size='sm' onClick={() => deletePost(post.get('id'))}>DELETE</Button>
              </span>
            }
          </h2>

          <div className={cx("post-meta")}>
            Posted by {post.get("createdBy")}
            <span> {`  `} </span>
            {moment(post.get("lastModifiedDate")).format("lll")}
          </div>

          <hr />
        </div>
        <div className={cx('post-body')}>{renderHTML(post.get("body"))}</div>
      </div>
      <hr></hr>
      <CommentList
        isAuthenticated={isAuthenticated}
        loading={false}
        comments={comments}
        writeComment={writeComment}
        postId={post.get("id")}>
      </CommentList>
    </Fragment>
  )
};



export default Post;