import mongoose from "mongoose";

export interface User extends Omit<Document, "__v"> {
  username: string;
  email: string;
  password: string;
  age: number;
  name?: string;
  readingPreferences?: string[];
  books: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Book extends Omit<Document, "__v"> {
  title: string;
  author: string;
  description?: string;
  genre?: string;
  pageCount?: number;
  publisher?: string;
  publicationDate?: Date;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
