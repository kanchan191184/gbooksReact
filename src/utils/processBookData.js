export const processBookData = (data) => {
  return data.map((book) => ({
    title: book?.volumeInfo?.title || "Unknown Title",
    author1: book?.volumeInfo?.authors?.[0] || "Unknown Author",
    author2: book?.volumeInfo?.authors?.[1] || null,
    image: book?.volumeInfo?.imageLinks?.thumbnail || null,
    description: book?.volumeInfo?.description || "No description available",
  }));
};
