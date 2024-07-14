import mongoose, { Document, Schema } from "mongoose";

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.ts <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://apaltemaa:${password}@personcluster.ygllpta.mongodb.net/BookHaven?retryWrites=true&w=majority&appName=PersonCluster`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

export interface Book extends Omit<Document, "__v"> {
  title: string;
  author: string;
  description?: string;
  genre?: string;
  pageCount?: number;
  publisher?: string;
  publicationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  user: mongoose.Types.ObjectId;
}

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

const book = new Book({
  title: "Harry Potter and the Philosopher's Stone",
  author: "J.K. Rowling",
  description: "The book that started it all.",
  genre: "Fantasy",
  pageCount: 223,
  publisher: "Bloomsbury",
  publicationDate: new Date("1997-06-26"),
});

book
  .save()
  .then((_) => {
    // Using '_' since the result is not used
    console.log("book saved!");
    void mongoose.connection.close();
  })
  .catch((error) => {
    // Handling potential errors
    console.error("Error saving the book:", error);
    void mongoose.connection.close();
  });
