import axios from 'axios';
import config from 'config';

export const getPost = (postId) => axios.get(`${config.apiHost}/api/posts/${postId}`);
export const getPosts = ({page, size}) => axios.get(`${config.apiHost}/api/posts/?page=${page}&size=${size}`);
export const writePost = (title, body) => axios.post(`${config.apiHost}/api/posts`, { title, body});
export const editPost = (id, title, body) => axios.put(`${config.apiHost}/api/posts/${id}`, { id, title, body});
