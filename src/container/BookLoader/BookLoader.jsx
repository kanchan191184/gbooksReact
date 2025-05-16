import { useEffect, useState } from "react";
import { getRandomBook } from "../../services/book-services";
import { processBookData } from "../../utils/processBookData";
import BookCard from "../../components/BookCard/BookCard";
import classes from "./BookLoader.module.scss";
import Modal from "../../components/Modal/Modal";
import ReactPaginate from "react-paginate";

export default function UserLoader({ bookTitle }) {
  const [bookData, setbookData] = useState([]);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("PENDING");
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = useState(0); // Current page (0-indexed)
  const postsPerPage = 10; // Number of posts per page

  useEffect(() => {
    if (!bookTitle) return;
    setFetchStatus("LOADING");
    getRandomBook(bookTitle, currentPage, postsPerPage)
      .then((data) => {
        console.log("Fetched Data Items:", data.items);
        if (data && data.items.length > 0) {
          const processedData = processBookData(data.items);
          console.log("Processed Data:", processedData);
          setbookData(processedData);

          const totalAvailable = data.totalItems > 100 ? 100 : data.totalItems;
          setPageCount(Math.ceil(totalAvailable / postsPerPage)); // Calculate total pages
          setFetchStatus("SUCCESS");
        } else {
          throw new Error("No book data available");
        }
      })
      .catch((e) => {
        setFetchStatus("FAILED");
        setError(e);
      });
  }, [bookTitle, currentPage]);

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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Update the current page
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

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount} // Total number of pages
        marginPagesDisplayed={2} // How many pages to show at the beginning and end
        pageRangeDisplayed={3} // How many pages to show around the current page
        onPageChange={handlePageClick} // What happens when a page is clicked
        containerClassName={classes.pagination} // CSS class for the pagination container
        activeClassName={classes.active} // CSS class for the active page
      />

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
