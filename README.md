* Tech Stack
Frontend: React.js, Tailwind CSS, Axios, React Router, React Toastify
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT (with role-based access)
Deployment: Render / Vercel / Railway (optional)



* Features
👤 User Management
Register as Member (default role)
Login with JWT authentication

Roles:
Admin: Full access
Member: Limited access (borrow, return, view books, history)

* Book Management (Admin Only)
Add new books with:

title, author, genre, description, publishedYear, price, number of copies
Update book details
Delete a book
View paginated book list (all users)
Filter books by genre, author