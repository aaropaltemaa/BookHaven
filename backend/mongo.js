// Purpose: Insert books to MongoDB database
const mongoose = require("mongoose");
const Book = require("./models/book");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const mongoURI = `mongodb+srv://apaltemaa:${password}@personcluster.ygllpta.mongodb.net/BookHaven?retryWrites=true&w=majority&appName=PersonCluster`;

const books = [
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedDate: "1949-06-08",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    isbn: "978-0-452-28423-4",
    pageCount: 328,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Southern Gothic",
    publishedDate: "1960-07-11",
    description:
      "A novel about the serious issues of rape and racial inequality.",
    isbn: "978-0-06-112008-4",
    pageCount: 281,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Tragedy",
    publishedDate: "1925-04-10",
    description: "A novel that critiques the American dream.",
    isbn: "978-0-7432-7356-5",
    pageCount: 180,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/f/f7/TheGreatGatsby_1925jacket.gif",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedDate: "1813-01-28",
    description:
      "A romantic novel that charts the emotional development of the protagonist.",
    isbn: "978-0-19-953556-9",
    pageCount: 432,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/PrideAndPrejudiceTitlePage.jpg/400px-PrideAndPrejudiceTitlePage.jpg",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    publishedDate: "1851-10-18",
    description:
      "A sailor's narrative of the obsessive quest of Ahab for revenge on Moby Dick.",
    isbn: "978-0-14-243724-7",
    pageCount: 635,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/7/76/Moby-Dick_FE_title_page.jpg",
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical",
    publishedDate: "1869",
    description:
      "A novel that chronicles the history of the French invasion of Russia.",
    isbn: "978-0-14-044793-4",
    pageCount: 1225,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/War-and-peace-book-cover.jpg",
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Psychological",
    publishedDate: "1866",
    description:
      "A novel about the mental anguish and moral dilemmas of an impoverished ex-student.",
    isbn: "978-0-14-044913-6",
    pageCount: 671,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Crimeandpunishmentcover.png",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-Age",
    publishedDate: "1951-07-16",
    description:
      "A novel about the experiences of a young boy in New York City.",
    isbn: "978-0-316-76948-0",
    pageCount: 277,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/3/32/Rye_catcher.jpg",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Science Fiction",
    publishedDate: "1932",
    description: "A dystopian novel set in a futuristic World State.",
    isbn: "978-0-06-085052-4",
    pageCount: 311,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedDate: "1937-09-21",
    description:
      "A children's fantasy novel about the adventures of Bilbo Baggins.",
    isbn: "978-0-618-00221-3",
    pageCount: 310,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Philosophical",
    publishedDate: "1890",
    description:
      "A novel about a man who remains young while his portrait ages.",
    isbn: "978-0-14-143957-0",
    pageCount: 254,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/0/06/Dorian_Gray_wilde.jpg",
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    genre: "Philosophical",
    publishedDate: "1880",
    description:
      "A novel that explores deep philosophical and theological questions.",
    isbn: "978-0-14-044924-2",
    pageCount: 796,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/4/45/The_Brothers_Karamazov.jpg",
  },
  {
    title: "Ulysses",
    author: "James Joyce",
    genre: "Modernist",
    publishedDate: "1922-02-02",
    description:
      "A novel that chronicles the appointments and encounters of Leopold Bloom.",
    isbn: "978-0-679-72232-9",
    pageCount: 730,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/0/00/UlyssesCover.jpg",
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genre: "Romance",
    publishedDate: "1847-10-16",
    description:
      "A novel that follows the experiences of its eponymous heroine.",
    isbn: "978-0-14-144114-6",
    pageCount: 500,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Jane_Eyre_title_page.jpg/400px-Jane_Eyre_title_page.jpg",
  },
  {
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    genre: "Epic Poetry",
    publishedDate: "1320",
    description:
      "An epic poem that describes Dante's journey through Hell, Purgatory, and Heaven.",
    isbn: "978-0-14-243722-3",
    pageCount: 798,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Dante_Divine_Comedy.jpg/400px-Dante_Divine_Comedy.jpg",
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Gothic",
    publishedDate: "1847",
    description:
      "A novel that presents the story of Catherine Earnshaw and Heathcliff.",
    isbn: "978-0-14-143955-6",
    pageCount: 416,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Wuthering_Heights_%281st_edition%29.jpg/400px-Wuthering_Heights_%281st_edition%29.jpg",
  },
  {
    title: "The Odyssey",
    author: "Homer",
    genre: "Epic",
    publishedDate: "800",
    description: "An epic poem that follows the adventures of Odysseus.",
    isbn: "978-0-14-026886-7",
    pageCount: 541,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Odyssey-circe.jpg/400px-Odyssey-circe.jpg",
  },
  {
    title: "The Iliad",
    author: "Homer",
    genre: "Epic",
    publishedDate: "800",
    description: "An epic poem set during the Trojan War.",
    isbn: "978-0-14-027536-0",
    pageCount: 683,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Homer_Iliad_Manuscript.jpg/400px-Homer_Iliad_Manuscript.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    publishedDate: "1988",
    description:
      "A novel that follows a young Andalusian shepherd in his journey to the pyramids of Egypt.",
    isbn: "978-0-06-231500-7",
    pageCount: 208,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/c/c4/TheAlchemist.jpg",
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    genre: "Philosophical",
    publishedDate: "1942",
    description: "A novel that explores the absurdity of human existence.",
    isbn: "978-0-679-72020-2",
    pageCount: 123,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/L%27Etranger_%28Camus_novel%29.jpg",
  },
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    genre: "Adventure",
    publishedDate: "1605",
    description:
      "A novel about a man who reads so many chivalric romances that he loses his sanity.",
    isbn: "978-0-14-243723-0",
    pageCount: 1072,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Don_Quixote_and_Sancho_Panza.jpg/400px-Don_Quixote_and_Sancho_Panza.jpg",
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    genre: "Gothic",
    publishedDate: "1818",
    description:
      "A novel that tells the story of Victor Frankenstein, a scientist who creates a sapient creature.",
    isbn: "978-0-14-143947-1",
    pageCount: 280,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Frankenstein_1818_edition_title_page.jpg/400px-Frankenstein_1818_edition_title_page.jpg",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedDate: "1954-07-29",
    description: "An epic high-fantasy novel set in the world of Middle-earth.",
    isbn: "978-0-618-00222-0",
    pageCount: 1216,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Lord_of_the_Rings_cover.gif",
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garcia Marquez",
    genre: "Magic Realism",
    publishedDate: "1967",
    description:
      "A novel that tells the multi-generational story of the Buendía family.",
    isbn: "978-0-06-088328-7",
    pageCount: 417,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/f/fe/Cien_a%C3%B1os_de_soledad_%28book_cover%29.jpg",
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    genre: "Historical",
    publishedDate: "1862",
    description:
      "A novel that follows the lives and interactions of several characters, focusing on the struggles of ex-convict Jean Valjean.",
    isbn: "978-0-14-044430-8",
    pageCount: 1463,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Les_Mis%C3%A9rables_1st_Edition_%281862%29_Title_Page.jpg/400px-Les_Mis%C3%A9rables_1st_Edition_%281862%29_Title_Page.jpg",
  },
  {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    genre: "Romance",
    publishedDate: "1878",
    description:
      "A novel that tells the tragic story of a married aristocrat and her affair with the affluent Count Vronsky.",
    isbn: "978-0-14-303500-8",
    pageCount: 864,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/AnnaKareninaTitle.jpg/400px-AnnaKareninaTitle.jpg",
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    genre: "Gothic",
    publishedDate: "1897",
    description:
      "A novel that tells the story of Count Dracula's attempt to move from Transylvania to England.",
    isbn: "978-0-14-143984-6",
    pageCount: 418,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Dracula1st.jpeg/400px-Dracula1st.jpeg",
  },
  {
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    genre: "Adventure",
    publishedDate: "1884",
    description:
      "A novel about a young boy's adventures as he travels down the Mississippi River.",
    isbn: "978-0-14-243717-9",
    pageCount: 366,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Huckfinnbook.jpg/400px-Huckfinnbook.jpg",
  },
  {
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    genre: "Mystery",
    publishedDate: "1892",
    description:
      "A collection of twelve short stories featuring Sherlock Holmes.",
    isbn: "978-0-14-103437-9",
    pageCount: 307,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Adv_sherlock_holmes.jpg/400px-Adv_sherlock_holmes.jpg",
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    genre: "Adventure",
    publishedDate: "1844",
    description:
      "A novel that follows the story of Edmond Dantès as he seeks revenge against those who wronged him.",
    isbn: "978-0-14-044926-6",
    pageCount: 1276,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/CountOfMonteCristo.jpg/400px-CountOfMonteCristo.jpg",
  },
];

//more books can be added here in the same format as the one above  //

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
    return Book.insertMany(books);
  })
  .then(() => {
    console.log("Books inserted");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error inserting books", err);
  });
