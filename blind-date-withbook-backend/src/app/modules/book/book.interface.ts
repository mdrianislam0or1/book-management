import { Document } from "mongoose";

export interface Book extends Document {
  name: string;
  price: number;
  quantity: number;
  releaseDate: Date;
  author: string;
  isbn: string;
  genre: string;
  publisher: string;
  series?: string;
  language: string;
  format?: string;
  pageCount?: number;
  sold?: number;
  img?: string;
  owner?: string;
}

export interface FilterOptions {
  price?: { min?: number; max?: number };
  releaseDate?: Date;
  author?: string;
  isbn?: string;
  genre?: string;
  publisher?: string;
  series?: string;
  language?: string;
}
