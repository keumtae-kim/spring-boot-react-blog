import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import Post from "components/Post";

class PostContainer extends Component {

  getPost = async (id) => {
    const { PostActions } = this.props;
    console.log("request id : " + id)
    try {
      await PostActions.getPost(id);     
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  componentDidMount() {
    const { id } = this.props;
    const { post } = this.props;
    if (!post || post === undefined || post.isEmpty()) {
      this.getPost(id);
    }   
  }

  render() {
    const { post, loading, error, success } = this.props;
    return (
      <Fragment>
        { loading && "Loading..." }
        { error && <h1>Server Error!</h1> }
        { success && <Post post={post} /> }
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    post: state.post.get("post"),
    loading: state.pender.pending["post/GET_POST"],
    error: state.pender.failure["post/GET_POST"],
    success: state.pender.success["post/GET_POST"]
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostContainer);
