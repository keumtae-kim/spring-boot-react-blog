import React from "react";
import Comment from "../Comment/Comment";
import CommentBox from "../CommentBox/CommentBox";
import styles from './CommentList.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CommentList = ({ isAuthenticated, loading, comments, writeComment, postId }) => {

  return (
    <div className={cx("comment-list")}>
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{comments.size}</span>{" "}
        Comment{comments.size > 0 ? "s" : ""}
      </h5>

      {comments.size > 0 && comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
      {isAuthenticated && <CommentBox writeComment={writeComment} postId={postId} />}

      {(!isAuthenticated) && !loading ? (
        <div className="alert text-center alert-info">
          <a href='/login'>Please login to comment</a>
        </div>
      ) : null}
    </div>
  );
}

export default CommentList;