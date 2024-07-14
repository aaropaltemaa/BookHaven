import mongoose, { Schema } from "mongoose";
import { User } from "../types";

const userSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    name: { type: String },
    readingPreferences: [{ type: String }],
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: function (_doc, ret) {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model<User>("User", userSchema);

export default User;
