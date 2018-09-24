import axios from 'axios';

const API_PREFIX = 'http://localhost:3001';

const DEFAULT_HEADERS = {
  headers: { Authorization: 'POST_AUTHORIZATION' },
  mode: 'cors',
  cache: 'default'
};

export const addPost = post => 
  axios.post(`${API_PREFIX}/posts`, {...post}, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

export const getPost = id => 
  axios.get(`${API_PREFIX}/posts/${id}`, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

export const getPosts = () =>  
  axios.get(`${API_PREFIX}/posts`, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

  export const deletePost = postId =>  
  axios.delete(`${API_PREFIX}/posts/${postId}`, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

export const getPostsByCategory = category =>
  axios.get(`${API_PREFIX}/${category}/posts`, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });  

export const updatePostVote = (postId, option) =>  
  axios.post(`${API_PREFIX}/posts/${postId}`, {
    option 
  }, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

export const editPost = post => 
  axios.put(`${API_PREFIX}/posts/${post.id}`, {
    title: post.title,
    body: post.body,
  }, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

  
 