import React from "react";
import Comment from "../Comment/Comment";
import styles from './CommentList.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CommentList = ({ isAuthenticated, loading, comments }) => {
  return (
    <div className={cx("comment-list")}>
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{comments.length}</span>{" "}
        Comment{comments.length > 0 ? "s" : ""}
      </h5>
      
      {comments && comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}

      {(!isAuthenticated) && !loading ? (
        <div className="alert text-center alert-info">
          <a href='/login'>Be the first to comment</a>
        </div>
      ) : null}
    </div>
  );
}

export default CommentList;