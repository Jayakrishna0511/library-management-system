import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import AdminBooks from './pages/AdminBooks'; // ✅ NEW COMPONENT
import EditBook from './pages/EditBook';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ManageUsers from './pages/ManageUsers';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <Router>
      <Routes>
        {/*  Default route: Redirect to Register */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/*  Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  Authenticated user routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin-books"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            <ProtectedRoute requireAdmin={true}>
              <EditBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requireAdmin={true}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    <ToastContainer />
  </>
);

export default App;
