import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get("/books", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const found = res.data.books.find((b) => b._id === id);
        if (found) {
          setFormData({
            title: found.title || "",
            author: found.author || "",
            genre: found.genre || "",
            year: found.year || "",
          });
        } else {
          toast.error("Book not found.");
          navigate("/admin-books");
        }
      } catch (err) {
        toast.error("Authorization failed.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.put(`/books/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Book updated successfully!");
    setTimeout(() => {
      navigate("/admin-books");
    }, 1000); 
  } catch (err) {
    toast.error("Only admin can update.");
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E5DC] to-[#800020] p-6 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white bg-opacity-95 rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-[#800020] mb-4">
           Edit Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              placeholder="Author Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <input
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              placeholder="Genre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              type="number"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
              placeholder="Publication Year"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin-books")}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#800020] hover:bg-[#a0002a] text-white rounded-lg font-semibold transition"
            >
               Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;

