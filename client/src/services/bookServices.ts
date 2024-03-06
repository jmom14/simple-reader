import axios from 'axios';

const bookEnpoint = 'books/';

export const fetchBook = (bookId: string) => {
  
  return axios.get(`${bookEnpoint}`, );
};  