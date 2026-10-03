import { useEffect, useState } from "react";
import API from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: "",
  });

  const getBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setBook({
      title: "",
      author: "",
      category: "",
      publishedYear: "",
      availableCopies: "",
    });

    setEditId(null);
    setShowForm(false);
  };

  const saveBook = async (e) => {
    e.preventDefault();

    const data = {
      title: book.title,
      author: book.author,
      category: book.category,
      publishedYear: Number(book.publishedYear),
      availableCopies: Number(book.availableCopies),
    };

    if (editId === null) {
      await API.post("/books", data);
    } else {
      await API.put(`/books/${editId}`, data);
    }

    await getBooks();
    resetForm();
  };

  const editBook = (selectedBook) => {
    setBook({
      title: selectedBook.title,
      author: selectedBook.author,
      category: selectedBook.category,
      publishedYear: selectedBook.publishedYear,
      availableCopies: selectedBook.availableCopies,
    });

    setEditId(selectedBook.bookId);
    setShowForm(true);
  };

  const deleteBook = async (id) => {
    await API.delete(`/books/${id}`);
    await getBooks();
  };

  return (
    <>
      {!showForm ? (
        <div className="page-card">
          <div className="page-header">
            <h3>Books</h3>

            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-plus"></i> Add Book
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Published Year</th>
                <th>Available Copies</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((b, index) => (
                <tr key={b.bookId}>
                  <td>{index + 1}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>{b.publishedYear}</td>
                  <td>{b.availableCopies}</td>
                  <td>
                    <button
                      className="btn-edit"
                      type="button"
                      onClick={() => editBook(b)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>

                    <button
                      className="btn-delete"
                      type="button"
                      onClick={() => deleteBook(b.bookId)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="page-card">
          <h3>{editId === null ? "Add Book" : "Edit Book"}</h3>

          <form onSubmit={saveBook} className="form-grid">
            <div>
              <label>Title</label>
              <input
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
              />
            </div>

            <div>
              <label>Author</label>
              <input
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Enter author"
                required
              />
            </div>

            <div>
              <label>Category</label>
              <input
                name="category"
                value={book.category}
                onChange={handleChange}
                placeholder="Enter category"
              />
            </div>

            <div>
              <label>Published Year</label>
              <input
                name="publishedYear"
                value={book.publishedYear}
                onChange={handleChange}
                placeholder="Enter year"
                required
              />
            </div>

            <div>
              <label>Available Copies</label>
              <input
                name="availableCopies"
                value={book.availableCopies}
                onChange={handleChange}
                placeholder="Enter copies"
                required
              />
            </div>

            <div className="form-buttons">
              <button className="btn btn-primary" type="submit">
                Save
              </button>

              <button className="btn btn-light" type="button" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Books;