import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBooks = async () => {
    try {
      const res = await api.get(
        `/books?genre=${genre}&author=${author}&page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(res.data.books)) {
        setBooks(res.data.books);
        setTotalPages(parseInt(res.data.totalPages) || 1);
      } else {
        toast.warn("Unexpected response format");
        setBooks([]);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to fetch books.");
      }
    }
  };

  useEffect(() => {
    if (location.state?.newBook) {
      setBooks((prev) => [location.state.newBook, ...prev]);
      toast.success("Book added successfully!");
    }
  }, [location.state]);

  useEffect(() => {
    fetchBooks();
  }, [genre, author, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Book deleted");
      fetchBooks();
    } catch (err) {
      toast.error("Only admins can delete books.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.info("Logged out!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5E5DC 0%, #800020 100%)",
        padding: "clamp(16px, 5vw, 32px)",
        boxSizing: "border-box",
      }}
    >
      <ToastContainer />

      {/* Header */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            margin: 0,
            color: "#800020",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          📚 Book Library
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* {user?.role === "admin" && (
            <button
              onClick={() => navigate("/add-book")}
              style={buttonStyle("#10a37f", "#059669")}
            >
              Add Book
            </button>
          )} */}

          <button
            onClick={handleLogout}
            style={buttonStyle("#dc2626", "#b91c1c")}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#800020",
          }}
        >
          Search & Filter
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          <InputField
            label="Genre"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setPage(1);
            }}
          />

          <InputField
            label="Author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Book List */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: 0,
              color: "#800020",
            }}
          >
            Available Books ({books.length})
          </h3>

          {(genre || author) && (
            <button
              onClick={() => {
                setGenre("");
                setAuthor("");
                setPage(1);
              }}
              style={{
                padding: "8px 16px",
                background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {books.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {books.map((book) => (
              <div
                key={book._id}
                style={{
                  backgroundColor: "rgba(128, 0, 32, 0.02)",
                  border: "2px solid rgba(128, 0, 32, 0.1)",
                  borderRadius: "12px",
                  padding: "20px",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ marginBottom: "16px" }}>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "#800020",
                    }}
                  >
                    {book.title}
                  </h4>
                  <p style={textStyle}>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p style={textStyle}>
                    <strong>Genre:</strong> {book.genre || "Not specified"}
                  </p>
                  <p style={textStyle}>
                    <strong>Year:</strong> {book.year || "Not specified"}
                  </p>
                </div>

                {user?.role === "admin" && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                      style={buttonStyle("#4f46e5", "#3730a3")}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      style={buttonStyle("#dc2626", "#b91c1c")}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
            <p style={{ fontSize: "18px", margin: 0 }}>
              {genre || author
                ? "No books match your search criteria."
                : "No books available yet."}
            </p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              {genre || author
                ? "Try adjusting your filters."
                : "Books will appear here once added."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange }) => (
  <div>
    <label
      style={{
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151",
        marginBottom: "6px",
      }}
    >
      {label}
    </label>
    <input
      type="text"
      placeholder={`Search by ${label.toLowerCase()}...`}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px 16px",
        border: "2px solid #e5e7eb",
        borderRadius: "12px",
        fontSize: "16px",
        outline: "none",
        transition: "all 0.3s ease",
        backgroundColor: "white",
        color: "#374151",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#800020")}
      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
    />
  </div>
);

const buttonStyle = (startColor, endColor) => ({
  padding: "10px 16px",
  background: `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`,
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
});

const textStyle = {
  margin: "0 0 4px 0",
  color: "#666",
  fontSize: "14px",
};

export default BookList;
