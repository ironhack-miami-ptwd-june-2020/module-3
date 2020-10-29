import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const AUTHOR_SERVICE = {
  createAuthor(authorData) {
    return service.post('/api/authors', authorData);
  },
  getAuthors() {
    return service.get('/api/authors');
  }
};

export default AUTHOR_SERVICE;
