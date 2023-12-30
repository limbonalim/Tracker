import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'https://my-blog-b9721-default-rtdb.europe-west1.firebasedatabase.app'
});