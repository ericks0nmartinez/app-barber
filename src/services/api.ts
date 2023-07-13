import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-barber-w22j.onrender.com',
});

export default api;
