import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nodedeploy-api-7eq9.onrender.com',
});
