export interface Book {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  author: string;
  isbn: string;
  genre: string;
  publisher: string;
  series: string;
  language: string;
  format: string;
  pageCount: number;
  img: string;
}

export type BookType = {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  author: string;
  isbn: string;
  genre: string;
  publisher: string;
  series: string;
  language: string;
  format: string;
  pageCount: number;
  img: string;
};
