import mongoose, { Schema } from "mongoose";
import { Book } from "../types";

const bookSchema: Schema<Book> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    pageCount: { type: Number },
    publisher: { type: String },
    publicationDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

bookSchema.set("toJSON", {
  transform: function (_doc, ret) {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Book = mongoose.model<Book>("Book", bookSchema);

export default Book;
