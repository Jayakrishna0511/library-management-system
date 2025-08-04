import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBooks = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", author: "", genre: "", year: "" });
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      toast.error("Access denied.");
      navigate("/login");
    } else {
      fetchBooks();
    }
  }, [navigate, token, user]);

    const fetchBooks = async () => {
      try {
        const res = await api.get("/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data.books || []);
      } catch (err) {
        toast.error("Failed to fetch books.");
      }
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/books", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Book added!");
      setFormData({ title: "", author: "", genre: "", year: "" });
      fetchBooks();
    } catch (err) {
      toast.error("Error adding book.");
    }
  };




  const handleDelete = (id) => {
  toast.info(
    <div>
      <p className="text-sm font-medium">Are you sure you want to delete this book?</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={async () => {
            toast.dismiss();
            try {
              await api.delete(`/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("Book deleted!");
              fetchBooks();
            } catch (err) {
              toast.error("Delete failed.");
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded shadow"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="bg-gray-400 hover:bg-gray-500 text-white text-xs px-3 py-1 rounded shadow"
        >
          No
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      hideProgressBar: true,
    }
  );
};


  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E5DC] to-[#800020] p-4">
      <ToastContainer />

      {/* Header */}
      <div className="bg-white/90 rounded-xl p-6 mb-6 shadow border backdrop-blur flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-[#800020]">Admin - Add & Manage Books</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate("/users")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-semibold shadow">
            👥 Manage Users
          </button>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold shadow">
            Logout
          </button>
        </div>
      </div>

      {/* Add Book Form */}
      <div className="bg-white/90 rounded-xl p-6 mb-6 max-w-3xl mx-auto shadow border backdrop-blur">
        <h3 className="text-xl font-semibold text-[#800020] mb-4">Add New Book</h3>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 mb-4">
          <input type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange} required className="input" />
          <input type="text" name="author" placeholder="Author Name" value={formData.author} onChange={handleChange} required className="input" />
          <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} className="input" />
          <input type="number" name="year" placeholder="Publication Year" value={formData.year} onChange={handleChange} className="input" />
          <button type="submit" className="col-span-full bg-[#800020] hover:bg-[#a0002a] text-white font-semibold py-2 px-4 rounded-md shadow transition">
             Add Book
          </button>
        </form>
      </div>

      {/* Book List */}
      <div className="bg-white/90 rounded-xl p-6 shadow border backdrop-blur max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold text-[#800020] mb-4">Existing Books ({books.length})</h3>
        {books.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.map((book) => (
              <div key={book._id} className="bg-[#800020]/5 hover:bg-[#800020]/10 border border-[#800020]/20 hover:border-[#800020] rounded-lg p-4 transition shadow-sm">
                <h4 className="text-lg font-semibold text-[#800020]">{book.title}</h4>
                <p className="text-sm text-gray-700"><strong>Author:</strong> {book.author}</p>
                <p className="text-sm text-gray-700"><strong>Genre:</strong> {book.genre || "N/A"}</p>
                <p className="text-sm text-gray-700"><strong>Year:</strong> {book.year || "N/A"}</p>
                <div className="flex justify-end gap-2 mt-3">
                  <button onClick={() => navigate(`/edit-book/${book._id}`)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded shadow">
                     Edit
                  </button>
                  <button onClick={() => handleDelete(book._id)} className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded shadow">
                     Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-600">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-lg">No books available yet.</p>
            <p className="text-sm">Add your first book using the form above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;
