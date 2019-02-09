import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

//action types
const LOGIN = 'auth/LOGIN'
const LOGOUT = 'auth/LOGOUT'
const GET_USER = 'auth/GET_USER';

export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT);
export const getUser = createAction(GET_USER, api.getUser);

const initialState = Map({
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false // Errors returned from server side 
});

export default handleActions({
  [LOGOUT]: (state, action) => {
    console.log("LOGOUT action")

    if (Storage.local.get("__AUTH__")) {
      Storage.local.remove("__AUTH__");
    }
    if (Storage.session.get("__AUTH__")) {
      Storage.session.remove("__AUTH__");
    }

    return state.set('isAuthenticated', false)
      .set('loginSuccess', false);
  },
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {
      console.log("LOGIN onSuccess")
      const { data: content } = action.payload;
      const bearerToken = content.token;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        const rememberMe = false;
        if (rememberMe) {
          Storage.local.set("__AUTH__", jwt);
        } else {
          Storage.session.set("__AUTH__", jwt);
        }
      }
      return state.set('isAuthenticated', true);
    },
    onFailure: (state, action) => {
      console.log("LOGIN onFailure")
      return state.set('isAuthenticated', false);
    }
  }),
  ...pender({
    type: GET_USER,
    onSuccess: (state, action) => {
      console.log("GET_USER onSuccess")
      return state.set('isAuthenticated', true);
    },
    onFailure: (state, action) => {
      console.log("GET_USER onFailure")
      return state.set('isAuthenticated', false);
    }
  })
}, initialState);