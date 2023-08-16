const { findAuthorById } = require("./books.js");

const getTotalBooksCount = (books) => books.length;

const getTotalAccountsCount = (accounts) => accounts.length;

const getBooksBorrowedCount = (books) => {
  let checkedBooks = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );
  return checkedBooks.length;
};

const getMostCommonGenres = (books) => {
  const genreCount = {};

  for (let i = 0; i < books.length; i++) {
    if (!genreCount[books[i].genre]) {
      genreCount[books[i].genre] = 1;
    } else {
      genreCount[books[i].genre]++;
    }
  }
  return Object.keys(genreCount)
    .map((genre) => ({ name: genre, count: genreCount[genre] }))
    .sort((g1, g2) => g2.count - g1.count)
    .slice(0, 5);
};

const getMostPopularBooks = (books) => {
  return books
    .map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    .sort((b1, b2) => b2.count - b1.count)
    .slice(0, 5);
};

const getMostPopularAuthors = (books, authors) => {
  const authorCount = books.reduce((acc, book) => {
    if (!acc[book.authorId]) {
      acc[book.authorId] = book.borrows.length;
    } else {
      acc[book.authorId] += book.borrows.length;
    }
    return acc;
  }, {});
  return Object.keys(authorCount)
    .map((authorId) => {
      //helper function findAuthorById()
      const authorObject = findAuthorById(authors, parseInt(authorId));
      return {
        name: `${authorObject.name.first} ${authorObject.name.last}`,
        count: authorCount[authorId],
      };
    })
    .sort((a1, a2) => a2.count - a1.count)
    .slice(0, 5);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
