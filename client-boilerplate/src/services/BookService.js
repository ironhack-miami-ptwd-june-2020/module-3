import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const BOOK_SERVICE = {
  createBook(bookData) {
    return service.post('/api/books', bookData);
  },
  getBooks() {
    return service.get('/api/books');
  },
  deleteBook(id) {
    return service.post(`/api/books/${id}/delete`, {});
  },
  updateBook(id, bookData) {
    return service.post(`/api/books/${id}/update`, bookData);
  },
  getBookDetails(id) {
    return service.get(`/api/books/${id}`);
  }
};

export default BOOK_SERVICE;
