import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E5DC] to-[#800020] p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="bg-white/90 rounded-xl p-6 sm:p-8 shadow-md border backdrop-blur-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#800020] mb-1">
            Welcome, {user?.username || 'Admin'}! 📚
          </h2>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            Role:
            <span className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${user?.role === 'admin' ? 'bg-[#800020]' : 'bg-indigo-600'}`}>
              {user?.role === 'admin' ? 'Admin' : 'User'}
            </span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white/90 rounded-xl p-6 sm:p-8 shadow-md border backdrop-blur-md max-w-6xl mx-auto">
        {user?.role === 'admin' ? (
          <>
            <h3 className="text-xl sm:text-2xl font-bold text-[#800020] mb-6">
              Admin Controls
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add & Manage Books */}
              <Link to="/admin-books" className="no-underline">
                <div className="bg-[#800020]/5 border border-[#800020]/20 hover:bg-[#800020]/10 hover:border-[#800020] rounded-lg p-5 transition transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-3xl mb-2">📖</div>
                  <h4 className="text-lg font-semibold text-[#800020] mb-1">Add & Manage Books</h4>
                  <p className="text-sm text-gray-600">Add new books and manage existing library collection.</p>
                </div>
              </Link>

              {/* View Books */}
              <Link to="/books" className="no-underline">
                <div className="bg-indigo-600/5 border border-indigo-600/20 hover:bg-indigo-600/10 hover:border-indigo-600 rounded-lg p-5 transition transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-3xl mb-2">📚</div>
                  <h4 className="text-lg font-semibold text-indigo-600 mb-1">View All Books</h4>
                  <p className="text-sm text-gray-600">Browse and search through the entire library catalog.</p>
                </div>
              </Link>

              {/* Manage Users */}
              <Link to="/users" className="no-underline">
                <div className="bg-emerald-600/5 border border-emerald-600/20 hover:bg-emerald-600/10 hover:border-emerald-600 rounded-lg p-5 transition transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-3xl mb-2">👥</div>
                  <h4 className="text-lg font-semibold text-emerald-600 mb-1">Manage Users</h4>
                  <p className="text-sm text-gray-600">View and manage registered users and permissions.</p>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl sm:text-2xl font-bold text-[#800020] mb-6">
              👤 User Dashboard
            </h3>

            <div className="flex justify-center">
              <Link to="/books" className="no-underline">
                <div className="bg-indigo-600/5 border border-indigo-600/20 hover:bg-indigo-600/10 hover:border-indigo-600 rounded-lg p-6 sm:p-8 transition transform hover:-translate-y-1 hover:shadow-lg text-center min-w-[280px]">
                  <div className="text-4xl mb-3">📚</div>
                  <h4 className="text-lg font-semibold text-indigo-600 mb-1">View Books</h4>
                  <p className="text-sm text-gray-600">Browse and search through available books.</p>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
