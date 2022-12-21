const API_URL =
  "https://ac7minh6n7s3rw4qfchrofbwai0amiko.lambda-url.eu-north-1.on.aws/";

const insertBooks = (books) => {
  document.getElementById("books").innerHTML = "";

  for (const book of books) {
    document.getElementById("books").innerHTML += `<li>
  ${book.name} ; ${book.author} ; ${book.release_year}
  </li>`;
  }
};

const loadAllBooks = async () => {
  let books = await fetch(API_URL);

  books = await books.json();

  insertBooks(books);
};

document.getElementById("search-by-author").onclick = async (event) => {
  let author = document.getElementById("author").value;

  if (author.length === 0) {
    alert("Zadejte jméno autora");
    return;
  }

  let books = await fetch(API_URL, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author: author,
    }),
  });

  if (books.status !== 200) {
    alert("Autor nenalezen.");
    return;
  }

  books = await books.json();

  insertBooks(books);
};

document.getElementById("search-by-name").onclick = async (event) => {
  let name = document.getElementById("name").value;

  if (name.length === 0) {
    alert("Zadejte název knihy");
    return;
  }

  let books = await fetch(API_URL, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  if (books.status !== 200) {
    alert("Autor nenalezen.");
    return;
  }

  books = await books.json();

  insertBooks(books);
};

document.getElementById("reset").onclick = async () => {
  document.getElementById("name").innerHTML = "";
  document.getElementById("author").innerHTML = "";

  await loadAllBooks();
};
window.onload = loadAllBooks;
