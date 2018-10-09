import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

//action types
const GET_POST_LIST = 'post/GET_POST_LIST';
const GET_POST = 'post/GET_POST';

export const getPostList = createAction(GET_POST_LIST, api.getPosts);
export const getPost = createAction(GET_POST, api.getPost);

const initialState = Map({
  posts: List(),
  post: Map({})
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
      console.log("test : " + content)
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
  })
}, initialState)