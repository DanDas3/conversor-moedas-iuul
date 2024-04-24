import axios from 'axios';
const API_KEY = 'd94d8161de31f76892e6e894'
export const http = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${API_KEY}/`,
})
