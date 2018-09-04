import axios from 'axios';

export const API = axios.create({
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000', 
    'Access-Control-Allow-Credentials': 'true',
    'X-Requested-With' : "XMLHttpRequest"
  }
});