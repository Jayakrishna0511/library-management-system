import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post('http://localhost:5000/api/users/register', form);
      await axios.post('https://library-management-system-pi4l.onrender.com/api/users/register', form);
      toast.success('Registration successful!');
      navigate('/login'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "linear-gradient(135deg, #F5E5DC 0%, #800020 100%)",
      position: "relative"
    }}>
      
      {/* Decorative shapes */}
      <div style={{
        position: "absolute",
        top: "80px",
        left: "80px",
        width: "128px",
        height: "128px",
        borderRadius: "50%",
        backgroundColor: "#800020",
        opacity: "0.2"
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "80px",
        right: "80px",
        width: "96px",
        height: "96px",
        borderRadius: "50%",
        backgroundColor: "#F5E5DC",
        opacity: "0.15"
      }}></div>

      <div style={{ 
        width: "100%", 
        maxWidth: "400px",
        textAlign: "center"
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "rgba(128, 0, 32, 0.1)",
            marginBottom: "16px"
          }}>
            📚
          </div>
          <h2 style={{ 
            fontSize: "32px",
            fontWeight: "bold",
            margin: "0 0 8px 0",
            color: "#800020"
          }}>Join Library</h2>
          <p style={{ 
            color: "#666",
            margin: "0"
          }}>Create your account to get started</p>
        </div>

        {/* Form Container */}
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)"
        }}>
          
          <form onSubmit={handleSubmit}>
            
            <div style={{ marginBottom: "20px" }}>
              <input 
                name="name" 
                onChange={handleChange} 
                placeholder="Full Name" 
                required 
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

            <div style={{ marginBottom: "20px" }}>
              <input 
                name="email" 
                onChange={handleChange} 
                placeholder="Email Address" 
                required 
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

            <div style={{ marginBottom: "20px" }}>
              <input 
                name="password" 
                type="password" 
                onChange={handleChange} 
                placeholder="Password" 
                required 
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

            <div style={{ marginBottom: "24px" }}>
              <select 
                name="role" 
                onChange={handleChange}
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
              >
                <option value="user">Library User</option>
                <option value="admin">Library Admin</option>
              </select>
            </div>

            <button 
              type="submit"
              style={{
                width: "100%",
                padding: "12px 24px",
                background: "linear-gradient(135deg, #800020 0%, #a0002a 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(128, 0, 32, 0.3)"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(128, 0, 32, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(128, 0, 32, 0.3)";
              }}
            >
              Create Account
            </button>
          </form>

          <p style={{ 
            marginTop: "24px",
            color: "#666",
            fontSize: "14px"
          }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: "#800020",
                textDecoration: "none",
                fontWeight: "600"
              }}
              onMouseOver={(e) => e.target.style.textDecoration = "underline"}
              onMouseOut={(e) => e.target.style.textDecoration = "none"}
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: "center",
          marginTop: "32px"
        }}>
          <p style={{ 
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.8)",
            margin: "0"
          }}>
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;