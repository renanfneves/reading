import axios from 'axios';

const API_PREFIX = 'http://localhost:3001';

export const getCategories = () =>
  axios.get(`${API_PREFIX}/categories`, {
    headers: { Authorization: 'category-token'},
    mode: 'cors',
    cache: 'default'
  }).then(response => response.data).catch(error => {
    throw error;
  });
