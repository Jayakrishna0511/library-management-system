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

  // 📌 Inject new book from AddBook route
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
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #F5E5DC 0%, #800020 100%)",
      padding: "20px"
    }}>
      <ToastContainer />
      
      {/* Header */}
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "16px",
        padding: "24px 32px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <h2 style={{ 
          fontSize: "28px",
          fontWeight: "bold",
          margin: "0",
          color: "#800020",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          📚 Book Library
        </h2>
        
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {user?.role === "admin" && (
            <button 
              onClick={() => navigate("/add-book")}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #10a37f 0%, #059669 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(16, 163, 127, 0.3)"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(16, 163, 127, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(16, 163, 127, 0.3)";
              }}
            >
               Add Book
            </button>
          )}
          
          <button 
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(220, 38, 38, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(220, 38, 38, 0.3)";
            }}
          >
             Logout
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        marginBottom: "24px",
        maxWidth: "800px",
        margin: "0 auto 24px auto"
      }}>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "600",
          margin: "0 0 16px 0",
          color: "#800020",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
           Search & Filter
        </h3>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px"
        }}>
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "6px"
            }}>
               Genre
            </label>
            <input
              type="text"
              placeholder="Search by genre..."
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                setPage(1);
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s ease",
                backgroundColor: "white",
                color: "#374151"
              }}
              onFocus={(e) => e.target.style.borderColor = '#800020'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "6px"
            }}>
               Author
            </label>
            <input
              type="text"
              placeholder="Search by author..."
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                setPage(1);
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s ease",
                backgroundColor: "white",
                color: "#374151"
              }}
              onFocus={(e) => e.target.style.borderColor = '#800020'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>
      </div>

      {/* Book List */}
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: "0",
            color: "#800020",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
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
                transition: "all 0.3s ease"
              }}
            >
               Clear Filters
            </button>
          )}
        </div>
        
        {books.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px"
          }}>
            {books.map((book) => (
              <div key={book._id} style={{
                backgroundColor: "rgba(128, 0, 32, 0.02)",
                border: "2px solid rgba(128, 0, 32, 0.1)",
                borderRadius: "12px",
                padding: "20px",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(128, 0, 32, 0.05)";
                e.currentTarget.style.borderColor = "rgba(128, 0, 32, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(128, 0, 32, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(128, 0, 32, 0.02)";
                e.currentTarget.style.borderColor = "rgba(128, 0, 32, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                
                <div style={{ marginBottom: "16px" }}>
                  <h4 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                    color: "#800020"
                  }}>
                     {book.title}
                  </h4>
                  <p style={{
                    margin: "0 0 4px 0",
                    color: "#666",
                    fontSize: "14px"
                  }}>
                     <strong>Author:</strong> {book.author}
                  </p>
                  <p style={{
                    margin: "0 0 4px 0",
                    color: "#666",
                    fontSize: "14px"
                  }}>
                     <strong>Genre:</strong> {book.genre || "Not specified"}
                  </p>
                  <p style={{
                    margin: "0",
                    color: "#666",
                    fontSize: "14px"
                  }}>
                     <strong>Year:</strong> {book.year || "Not specified"}
                  </p>
                </div>

                {user?.role === "admin" && (
                  <div style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "flex-end"
                  }}>
                    <button 
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                      style={{
                        padding: "8px 16px",
                        background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 2px 8px rgba(79, 70, 229, 0.3)";
                      }}
                    >
                       Edit
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(book._id)}
                      style={{
                        padding: "8px 16px",
                        background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 2px 8px rgba(220, 38, 38, 0.3)";
                      }}
                    >
                       Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#666"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
            <p style={{ fontSize: "18px", margin: "0" }}>
              {genre || author ? "No books match your search criteria." : "No books available yet."}
            </p>
            <p style={{ fontSize: "14px", margin: "8px 0 0 0" }}>
              {genre || author ? "Try adjusting your filters." : "Books will appear here once added."}
            </p>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default BookList;