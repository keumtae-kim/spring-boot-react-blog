import React from "react";
import Comment from "../Comment/Comment";
import styles from './CommentList.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CommentList = ({ loading, comments }) => {
  return (
    <div className={cx("comment-list")}>
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{comments.length}</span>{" "}
        Comment{comments.length > 0 ? "s" : ""}
      </h5>

      {(!comments || comments.length === 0) && !loading ? (
        <div className="alert text-center alert-info">
          Be the first to comment
        </div>
      ) : null}


      {comments && comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;