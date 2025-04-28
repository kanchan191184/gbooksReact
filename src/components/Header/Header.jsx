import classes from "./Header.module.scss";

const Header = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookTitle = e.target.bookTitle.value;
    // console.log("Book Title:", bookTitle);
    onSearch(bookTitle); // Call the onSearch function with the book title
  };
  return (
    <div className={classes.header}>
      <h1>Books Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={classes.formInput}
          type="text"
          id="bookTitle"
          name="bookTitle"
          placeholder="Enter a Book title"
          required
        />
        <button className={classes.btn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;
