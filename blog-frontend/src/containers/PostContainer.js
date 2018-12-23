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

  deletePost = (id) => {
    const { PostActions, history } = this.props;
    try {
      PostActions.deletePost(id);
      history.push("/");
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  componentDidMount() {
    const { id } = this.props;
    this.getPost(id);
  }

  render() {
    const { post, loading, error, success } = this.props;
    if (loading)
      return null;
    return (
      <Fragment>
        {/* {loading && "Loading..."} */}
        {error && <h1>Server Error!</h1>}
        {success && <Post post={post} deletePost={this.deletePost}/>}
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
)(withRouter(PostContainer));
