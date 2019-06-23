import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

//action types
const GET_POST_LIST = 'post/GET_POST_LIST';
const GET_POST = 'post/GET_POST';
const WRITE_POST = 'post/WRITE_POST';
const DELETE_POST = 'post/DELETE_POST';
const GET_COMMENT_LIST = 'post/GET_COMMENT_LIST';
const WRITE_COMMENT = 'post/WRITE_COMMENT';

export const getPostList = createAction(GET_POST_LIST, api.getPosts);
export const getPost = createAction(GET_POST, api.getPost);
export const writePost = createAction(WRITE_POST, api.writePost);
export const editPost = createAction(WRITE_POST, api.editPost);
export const deletePost = createAction(DELETE_POST, api.deletePost);
export const getCommentList = createAction(GET_COMMENT_LIST, api.getComments);
export const writeComment = createAction(WRITE_COMMENT, api.writeComment);

const initialState = Map({
  posts: List(),
  post: Map({}),
  comments: List(),
});

export default handleActions({
  ...pender({
    type: GET_POST_LIST,
    onSuccess: (state, action) => {
      const { data: content } = action.payload;
      console.log("GET_POST_LIST onSuccess")
      return state.set('posts', fromJS(content))
    },
    onFailure: (state, action) => {
      console.log("GET_POST_LIST onFailure")
      return state;
    },
    onPending: (state, action) => {
      console.log("GET_POST_LIST onPending")
      return state;
    }
  }),
  ...pender({
    type: GET_POST,
    onSuccess: (state, action) => {
      const { data: content } = action.payload;
      console.log("GET_POST onSuccess")
      return state.set('post', fromJS(content));
    },
    onFailure: (state, action) => {
      console.log("GET_POST onFailure")
      return state;
    },
    onPending: (state, action) => {
      console.log("GET_POST onPending")
      return state;
    }
  }),
  ...pender({
    type: WRITE_POST,
    onSuccess: (state, action) => {
      const { id } = action.payload.data;
      console.log("WRITE_POST onSuccess")
      return state.set('postId', id);
    },
    onFailure: (state, action) => {
      console.log("WRITE_POST onFailure")
      return state;
    }
  }),
  ...pender({
    type: DELETE_POST,
    onSuccess: (state, action) => {
      console.log("DELETE_POST onSuccess")
      return state;
    },
    onFailure: (state, action) => {
      console.log("DELETE_POST onFailure")
      return state;
    }
  }),
  ...pender({
    type: GET_COMMENT_LIST,
    onSuccess: (state, action) => {
      const { data: content } = action.payload;
      console.log("GET_COMMENT_LIST onSuccess")
      const comments = content === "" ? List() : fromJS(content);
      return state.set('comments', comments)
    },
    onFailure: (state, action) => {
      console.log("GET_COMMENT_LIST onFailure")
      return state;
    },
    onPending: (state, action) => {
      console.log("GET_COMMENT_LIST onPending")
      return state;
    }
  }),
  ...pender({
    type: WRITE_COMMENT,
    onSuccess: (state, action) => {
      const { data: content } = action.payload;
      return state.set('comments', state.get('comments').push(fromJS(content)))
    },
    onFailure: (state, action) => {
      console.log("WRITE_COMMENT onFailure")
      return state;
    }
  })
}, initialState)