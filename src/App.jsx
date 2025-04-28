import "./App.scss";
import Header from "./components/Header/Header";
import BookLoader from "./container/BookLoader/BookLoader";
import { useState } from "react";

function App() {
  const [bookTitle, setBookTitle] = useState("");

  const handleSearch = (title) => {
    setBookTitle(title); // Update the book title state
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <BookLoader bookTitle={bookTitle} />
    </>
  );
}

export default App;
