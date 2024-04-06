import { z } from 'zod';

export const createBookValidation = z.object({
  name: z.string().min(3).max(100).optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  releaseDate: z.string().optional(),
  author: z.string().min(3).max(100).optional(),
  ISBN: z.string().length(13).optional(),
  genre: z.string().min(3).max(50).optional(),
  publisher: z.string().min(3).max(100).optional(),
  series: z.string().optional().optional(),
  language: z.string().min(2).max(50).optional(),
  format: z.string().optional().optional(),
  pageCount: z.number().optional().optional(),
});



export const updateBookValidation = z.object({
    bookId: z.string().uuid().optional(),
    name: z.string().min(3).max(255).optional(),
    price: z.number().min(0).optional(),
    quantity: z.number().min(0).optional(),
    releaseDate: z.string().optional(),
    author: z.string().min(3).max(255).optional(),
    isbn: z.string().min(10).max(20).optional(),
    genre: z.string().min(3).max(255).optional(),
    publisher: z.string().min(3).max(255).optional(),
    series: z.string().min(3).max(255).optional(),
    language: z.string().min(3).max(50).optional(),
    format: z.string().min(3).max(50).optional(),
    pageCount: z.number().min(0).optional(),
  });