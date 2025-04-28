import classes from "./BookCard.module.scss";
const BookCard = ({ bookData, onClick }) => {
  const { title, author1, author2, image } = bookData;

  return (
    <>
      <div className={classes.card} onClick={onClick}>
        <img src={image} alt={title} className={classes.img} />
        <div className={classes.container}>
          <h2 className={classes.title}>
            <b>{title}</b>
          </h2>
          {author2 ? (
            <h4 className={classes.author}>
              {author1} & {author2}
            </h4>
          ) : (
            <h4 className={classes.author}>{author1}</h4> // author of the book
          )}
        </div>
      </div>
    </>
  );
};

export default BookCard;
