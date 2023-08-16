const findAuthorById = (authors, id) =>
  authors.find((author) => author.id === id);

const findBookById = (books, id) => books.find((book) => book.id === id);

const partitionBooksByBorrowedStatus = (books) => {
  const organizedBooks = [];
  const checkedOut = books.filter((book) => book.borrows[0].returned === false);
  const available = books.filter((book) => book.borrows[0].returned === true);
  organizedBooks.push(checkedOut, available);
  return organizedBooks;
};

function getBorrowersForBook(book, accounts) {
  let borrowerData = [];
  for (let borrower = 0; borrower < book.borrows.length; borrower++) {
    const borrowerId = book.borrows[borrower].id;
    const accountData = accounts.find((account) => account.id === borrowerId);
    borrowerData.push({ ...book.borrows[borrower], ...accountData });
  }
  const dataSpliced = borrowerData.splice(10);
  return borrowerData;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
