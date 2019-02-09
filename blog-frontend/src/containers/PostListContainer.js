import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import PostList from "components/PostList";

class PostContainer extends Component {
  getPostList = async (page, size) => {
    const { PostActions } = this.props;
    try {
      await PostActions.getPostList(page, size);     
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  componentDidMount() {    
    this.getPostList(0, 10);
  }

  render() {
    const { posts, loading, error, success, isAuthenticated } = this.props;
    return (
      <Fragment>
        { loading && "Loading..." }
        { error && <h1>Server Error!</h1> }
        { success && <PostList posts={posts} isAuthenticated={isAuthenticated} /> }
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    posts: state.post.get("posts"),
    loading: state.pender.pending["post/GET_POST_LIST"],
    error: state.pender.failure["post/GET_POST_LIST"],
    success: state.pender.success["post/GET_POST_LIST"],
    isAuthenticated: state.auth.get("isAuthenticated")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostContainer);
