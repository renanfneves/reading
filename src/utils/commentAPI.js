import axios from 'axios';

const API_PREFIX = 'http://localhost:3001';

const DEFAULT_HEADERS = {
  headers: { Authorization: 'COMMENT_AUTHORIZATION' },
  mode: 'cors',
  cache: 'default'
};

export const addComment = comment =>
  axios.post(`${API_PREFIX}/comments`, {...comment}, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

  export const deleteComment = commentId =>
    axios.delete(`${API_PREFIX}/comments/${commentId}`, {
      ...DEFAULT_HEADERS,
    }).then(response => response.data).catch(error => {
      throw error;
    }); 

export const getCommentsOfPost = postId => 
  axios.get(`${API_PREFIX}/posts/${postId}/comments`, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

export const updateCommentVote = (commentId, option) => 
  axios.post(`${API_PREFIX}/comments/${commentId}`, { 
    option 
  }, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data ).catch(error => {
    throw error;
  });

export const updateComment = comment => 
  axios.put(`${API_PREFIX}/comments/${comment.id}`, {
    body: comment.body,
    timestamp: Date.now(),
  }, {
    ...DEFAULT_HEADERS,
  }).then(response => response.data).catch(error => {
    throw error;
  });

  
