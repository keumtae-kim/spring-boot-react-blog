import React, { Component } from 'react';
import styles from './CommentBox.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class CommentBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      comment: {
        message: ""
      }
    };
  }

  handleFieldChange = event => {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  writeComment = () => {
    let { postId, writeComment } = this.props;
    let { comment } = this.state;

    if (comment != null) {
      writeComment(postId, this.state.comment.message);
      this.setState({
        ...this.state,
        comment: {
          message: ""
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="media mb-3">
          <img
            className="mr-3 bg-light rounded"
            width="48"
            height="48"
            src={`http://www.gravatar.com/avatar/9c877af47d12736105d3a9a79c961568?d=identicon&s=40`}
            alt="test"
          />

          <div className={cx("comment-body")}>
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="form-control"
              placeholder="Your Comment"
              name="message"
              rows="5"
            />
            <hr />

            <div className={cx("comment-button")}>
              <button onClick={this.writeComment} disabled={this.state.loading} className="btn btn-primary float-right">
                Comment &#10148;
             </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CommentBox;