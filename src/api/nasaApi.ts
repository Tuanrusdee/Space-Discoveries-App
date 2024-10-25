import axios from 'axios';

const API_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'O03VgJ6FDZjxGUWYJiDeALlOaUITzf1oFCamjrXv';

export const fetchDiscoveries = (count: number = 100) => {
    return axios.get(`${API_URL}?api_key=${API_KEY}&count=${count}`);
};
