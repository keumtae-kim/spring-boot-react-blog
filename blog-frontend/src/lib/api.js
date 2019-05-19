import axios from 'axios';
import config from 'config';
import { Storage } from 'lib/storage';

export const getPost = (postId) => axios.get(`${config.apiHost}/api/posts/${postId}`);
export const getPosts = ({ page, size }) => axios.get(`${config.apiHost}/api/posts?page=${page}&size=${size}`);
export const writePost = (title, body) => axios.post(`${config.apiHost}/api/posts`, { title, body },
  {
    headers: {
      Authorization: getToken()
    }
  }

);
export const editPost = (id, title, body) => axios.put(`${config.apiHost}/api/posts/${id}`, { id, title, body },
  {
    headers: {
      Authorization: getToken()
    }
  }
);
export const deletePost = (id) => axios.delete(`${config.apiHost}/api/posts/${id}`,
  {
    headers: {
      Authorization: getToken()
    }
  });
export const login = (email, password) => axios.post(`${config.apiHost}/auth/authenticate`, { email, password });
export const getUser = () => axios.post(`${config.apiHost}/auth/user`, {},
  {
    headers: {
      Authorization: getToken()
    }
  });
export const getComments = (postId) => axios.get(`${config.apiHost}/api/comments/posts/${postId}`);

const getToken = () => {
  const token = Storage.local.get('__AUTH__') || Storage.session.get('__AUTH__');
  return `Bearer ${token}`
};