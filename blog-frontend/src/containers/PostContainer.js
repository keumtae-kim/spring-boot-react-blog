import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import Post from "components/Post";
import { withRouter } from 'react-router-dom';

class PostContainer extends Component {

  getPost = async (id) => {
    const { PostActions } = this.props;
    try {
      await PostActions.getPost(id);
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  deletePost = async (id) => {
    const { PostActions, history } = this.props;
    try {
      await PostActions.deletePost(id);
      history.push("/");
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  getCommentList = async (id) => {
    const { PostActions } = this.props;
    try {
      await PostActions.getCommentList(id);
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  writeComment = async (postId, body) => {
    const { PostActions } = this.props;
    try {
      await PostActions.writeComment(postId, body);
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  componentDidMount() {
    const { id } = this.props;
    this.getPost(id);
    this.getCommentList(id);
  }

  render() {
    const { post, comments, loading, error, success, isAuthenticated, currentUser } = this.props;
    if (loading)
      return null;

      return (
      <Fragment>        
        {error && <h1>Server Error!</h1>}
        {!error && success &&
          <Post post={post}
            comments={comments}
            deletePost={this.deletePost}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            writeComment={this.writeComment} />}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    post: state.post.get("post"),
    loading: state.pender.pending["post/GET_POST"],
    error: state.pender.failure["post/GET_POST"],
    comments: state.post.get("comments"),
    success: state.pender.success["post/GET_COMMENT_LIST"],
    commentsLoading: state.pender.pending["post/GET_COMMENTS"],
    commentsError: state.pender.failure["post/GET_COMMENT_LIST"],
    commentsSuccess: state.pender.success["post/GET_COMMENT_LIST"],
    isAuthenticated: state.auth.get("isAuthenticated"),
    currentUser: state.auth.get("currentUser")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(withRouter(PostContainer));
