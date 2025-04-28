import { API_URL, API_KEY } from "../config/api-config.js";
export const getRandomBook = async (title) => {
  const API_FULL_URL = `${API_URL}${encodeURIComponent(
    title
  )}&maxResults=40&key=${API_KEY}`;

  const response = await fetch(API_FULL_URL);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  // console.log(data);
  // console.log(title);
  // console.log(data.items[0].id);
  // console.log(data.items[0].volumeInfo.title); // title of the book
  // console.log(data.items[0].volumeInfo.authors[0]); // author of the book
  // console.log(data.items[0].volumeInfo.authors[1]); // author of the book
  // console.log(data.items[0].volumeInfo.publisher); // publisher of the book
  // console.log(data.items[0].volumeInfo.imageLinks.thumbnail); //  image of the book
  // console.log(data.items[0].volumeInfo.description); // description of the book
  return data.items;
};
