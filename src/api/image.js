import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39898309-45265a1d653ea9eb6356d15a3';

export const getImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  return response.data;
};
