import axios from 'axios';
import config from 'config';

export const getPost = (postId) => axios.get(`${config.apiHost}/api/posts/${postId}`);
export const getPosts = ({page, size}) => axios.get(`${config.apiHost}/api/posts/?page=${page}&size=${size}`);
 

