import axios from 'axios';

export default axios.create({
  //baseURL: `http://ptonline.ddns.net:25565/`
  baseURL: 'https://oxygen-api.herokuapp.com'
});