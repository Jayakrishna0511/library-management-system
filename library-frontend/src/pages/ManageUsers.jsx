// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState('');
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (!token) return <Navigate to="/login" replace />;
//   if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(
//         'https://library-management-system-pi4l.onrender.com/api/users',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setUsers(res.data || []);
//       setError('');
//     } catch (err) {
//       console.error('Fetch users error:', err);
//       toast.error('Failed to fetch users. Please try again.');
//       setError(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

// const handleDelete = async (userId) => {
//   toast.info('Deleting user...');

//   try {
//     await axios.delete(
//       `https://library-management-system-pi4l.onrender.com/api/users/${userId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     setUsers((prev) => prev.filter((u) => u._id !== userId));
//     toast.success('User deleted successfully!');
//   } catch (err) {
//     console.error('Delete user error:', err);
//     toast.error(err.response?.data?.message || 'Failed to delete user');
//   }
// };

//   const handleToggleStatus = async (userId, currentStatus = 'active') => {
//     const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active';

//     try {
//       await axios.put(
//         `https://library-management-system-pi4l.onrender.com/api/users/${userId}/status`,
//         { status: updatedStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       fetchUsers();
//       toast.success(`User status updated to ${updatedStatus}`);
//     } catch (err) {
//       console.error('Update status error:', err);
//       toast.error(err.response?.data?.message || 'Failed to update status');
//     }
//   };

//   const filteredUsers = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

//       {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}

//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search by name or email"
//         className="mb-4 p-2 border rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       {filteredUsers.length === 0 ? (
//         <p className="text-gray-600">No users found.</p>
//       ) : (
//         <>
//           {/* Table for large screens */}
//           <div className="hidden lg:block overflow-x-auto">
//             <table className="min-w-full bg-white border">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-2 px-4 border">Name</th>
//                   <th className="py-2 px-4 border">Email</th>
//                   <th className="py-2 px-4 border">Role</th>
//                   <th className="py-2 px-4 border">Status</th>
//                   <th className="py-2 px-4 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map((u) => (
//                   <tr key={u._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border">{u.name}</td>
//                     <td className="py-2 px-4 border">{u.email}</td>
//                     <td className="py-2 px-4 border">{u.role}</td>
//                     <td className="py-2 px-4 border">{u.status || 'active'}</td>
//                     <td className="py-2 px-4 border">
//                       <button
//                         onClick={() => handleToggleStatus(u._id, u.status || 'active')}
//                         className={`mr-2 px-3 py-1 rounded ${
//                           u.status === 'inactive'
//                             ? 'bg-green-600 text-white'
//                             : 'bg-yellow-500 text-white'
//                         }`}
//                       >
//                         {u.status === 'inactive' ? 'Activate' : 'Deactivate'}
//                       </button>
//                       <button
//                         onClick={() => handleDelete(u._id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Card view for small devices */}
//           <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//             {filteredUsers.map((u) => (
//               <div key={u._id} className="bg-white rounded-lg shadow p-4 border">
//                 <p><strong>Name:</strong> {u.name}</p>
//                 <p><strong>Email:</strong> {u.email}</p>
//                 <p><strong>Role:</strong> {u.role}</p>
//                 <p><strong>Status:</strong> {u.status || 'active'}</p>
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => handleToggleStatus(u._id, u.status || 'active')}
//                     className={`flex-1 px-3 py-1 rounded text-white ${
//                       u.status === 'inactive' ? 'bg-green-600' : 'bg-yellow-500'
//                     }`}
//                   >
//                     {u.status === 'inactive' ? 'Activate' : 'Deactivate'}
//                   </button>
//                   <button
//                     onClick={() => handleDelete(u._id)}
//                     className="flex-1 px-3 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;

















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [actionInProgress, setActionInProgress] = useState({}); // for per-user loading

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        'https://library-management-system-pi4l.onrender.com/api/users',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setUsers(res.data || []);
      setError('');
    } catch (err) {
      console.error('Fetch users error:', err);
      toast.error('Failed to fetch users. Please try again.');
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    setActionInProgress((prev) => ({ ...prev, [userId]: true }));
    try {
      await axios.delete(
        `https://library-management-system-pi4l.onrender.com/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success('User deleted successfully!');
    } catch (err) {
      console.error('Delete user error:', err);
      toast.error(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setActionInProgress((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleToggleStatus = async (userId, currentStatus = 'active') => {
    const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active';

    setActionInProgress((prev) => ({ ...prev, [userId]: true }));
    try {
      await axios.put(
        `https://library-management-system-pi4l.onrender.com/api/users/${userId}/status`,
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, status: updatedStatus } : u
        )
      );
      toast.success(`User status updated to ${updatedStatus}`);
    } catch (err) {
      console.error('Update status error:', err);
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setActionInProgress((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="mb-4 p-2 border rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredUsers.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Role</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{u.name}</td>
                    <td className="py-2 px-4 border">{u.email}</td>
                    <td className="py-2 px-4 border">{u.role}</td>
                    <td className="py-2 px-4 border">{u.status || 'active'}</td>
                    <td className="py-2 px-4 border">
                      <button
                        disabled={actionInProgress[u._id]}
                        onClick={() => handleToggleStatus(u._id, u.status || 'active')}
                        className={`mr-2 px-3 py-1 rounded ${
                          u.status === 'inactive'
                            ? 'bg-green-600 text-white'
                            : 'bg-yellow-500 text-white'
                        } ${actionInProgress[u._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {u.status === 'inactive' ? 'Activate' : 'Deactivate'}
                      </button>
                      <button
                        disabled={actionInProgress[u._id]}
                        onClick={() => handleDelete(u._id)}
                        className={`px-3 py-1 bg-red-500 text-white rounded ${
                          actionInProgress[u._id] ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for small devices */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {filteredUsers.map((u) => (
              <div key={u._id} className="bg-white rounded-lg shadow p-4 border">
                <p><strong>Name:</strong> {u.name}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Role:</strong> {u.role}</p>
                <p><strong>Status:</strong> {u.status || 'active'}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    disabled={actionInProgress[u._id]}
                    onClick={() => handleToggleStatus(u._id, u.status || 'active')}
                    className={`flex-1 px-3 py-1 rounded text-white ${
                      u.status === 'inactive' ? 'bg-green-600' : 'bg-yellow-500'
                    } ${actionInProgress[u._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {u.status === 'inactive' ? 'Activate' : 'Deactivate'}
                  </button>
                  <button
                    disabled={actionInProgress[u._id]}
                    onClick={() => handleDelete(u._id)}
                    className={`flex-1 px-3 py-1 bg-red-500 text-white rounded ${
                      actionInProgress[u._id] ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
