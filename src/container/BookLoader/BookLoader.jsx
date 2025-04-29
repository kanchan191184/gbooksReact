import { useEffect, useState } from "react";
import { getRandomBook } from "../../services/user-services";
import { processBookData } from "../../utils/processBookData";
import BookCard from "../../components/BookCard/BookCard";
import classes from "./BookLoader.module.scss";
import Modal from "../../components/Modal/Modal";

export default function UserLoader({ bookTitle }) {
  const [bookData, setbookData] = useState([]);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("PENDING");
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    if (!bookTitle) return;
    setFetchStatus("LOADING");
    getRandomBook(bookTitle)
      .then((data) => {
        if (data && data.length > 0) {
          setbookData(processBookData(data));
          setFetchStatus("SUCCESS");
        } else {
          throw new Error("No book data available");
        }
      })
      .catch((e) => {
        setFetchStatus("FAILED");
        setError(e);
      });
  }, [bookTitle]);

  // const title = bookData[0].volumeInfo.title;
  // const author1 = bookData[0].volumeInfo.authors[0]; // author of the book
  // const author2 = bookData[0].volumeInfo.authors[1]; // author of the book
  // // const publisher = bookData[0].volumeInfo.publisher; // publisher of the book
  // const image = bookData[0].volumeInfo.imageLinks.thumbnail; //  image of the book
  // console.log(bookData[0].volumeInfo.title); // title of the book

  const handleCardClick = (book) => {
    setSelectedBook(book); // Set the selected book
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBook(null); // Clear the selected book
  };

  return (
    <>
      {fetchStatus === "LOADING" && (
        <p className={classes.loadingMsg}>Loading...</p>
      )}
      {fetchStatus === "FAILED" && (
        <p className={classes.errMsg}>
          {error.message} with title '{bookTitle}'
        </p>
      )}
      {fetchStatus === "SUCCESS" && (
        <div>
          <h4 className={classes.booksCount}>
            Total {bookTitle} books found: {bookData.length}
          </h4>
          <div className={classes.bookGrid}>
            {bookData.map((book, index) => (
              <BookCard
                key={index}
                bookData={book}
                onClick={() => handleCardClick(book)}
              />
            ))}
          </div>
        </div>
      )}
      {isModalOpen && selectedBook && (
        <Modal onClose={closeModal}>
          <h2>{selectedBook.title}</h2>
          <p>{selectedBook.description}</p>
          <p>
            <b>Author(s):</b> {selectedBook.author1}
            {selectedBook.author2 && `, ${selectedBook.author2}`}
          </p>
          <img src={selectedBook.image} alt={selectedBook.title} />
        </Modal>
      )}
    </>
  );
}
