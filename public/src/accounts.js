const findAccountById = (accounts, id) =>
  accounts.find((account) => account.id === id);

const sortAccountsByLastName = (accounts) => {
  return accounts.sort((a, b) => (a.name.last < b.name.last ? -1 : 1));
};

const getTotalNumberOfBorrows = (account, books) => {
  let result = 0;
  books.forEach((book) => {
    const acctBorrowed = book.borrows.filter(
      (borrow) => borrow.id === account.id
    );
    result = result + acctBorrowed.length;
  });
  return result;
};

const getBooksPossessedByAccount = (account, books, authors) => {
  const authorObject = authors.reduce((acc, author) => {
    acc[author.id] = author;
    return acc;
  }, {});
  const combineBookAndAuthor = books.map((book) => {
    book.author = authorObject[book.authorId];
    return book;
  });
  let checkedBook = combineBookAndAuthor.filter((book) =>
    book.borrows.some((borrow) => !borrow.returned && borrow.id === account.id)
  );
  return checkedBook;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
