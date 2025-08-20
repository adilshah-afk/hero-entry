import React, { useState, useEffect } from "react";
import axios from "axios";

// Component for post listing and authentication
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [action, setAction] = useState("login"); // "login" or "register"

  // Fetch posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/posts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Get the token from localStorage
            },
          }
        );
        setPosts(response.data);
      } catch (err) {
        setError("Error fetching posts");
      }
    };

    if (loggedIn) fetchPosts();
  }, [loggedIn]);

  // Handle login functionality
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save JWT token in localStorage
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      setError("");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  // Handle register functionality
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email,
          password,
          name: userName,
        }
      );

      setError("Registration successful! Please log in.");
      setAction("login"); // After successful registration, switch to login form
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    setLoggedIn(false); // Update the logged-in state
  };

  if (error) return <p>{error}</p>;

  if (!loggedIn) {
    return (
      <div className="auth-container min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-white">
          {action === "login" ? (
            <div className="login-form space-y-6">
              <h2 className="text-2xl font-bold text-center text-yellow-400">
                Login
              </h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-md transition duration-200"
              >
                Login
              </button>
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <span
                  onClick={() => setAction("register")}
                  className="text-yellow-400 hover:underline cursor-pointer"
                >
                  Register
                </span>
              </p>
            </div>
          ) : (
            <div className="register-form space-y-6">
              <h2 className="text-2xl font-bold text-center text-yellow-400">
                Register
              </h2>
              <input
                type="text"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={handleRegister}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-md transition duration-200"
              >
                Register
              </button>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setAction("login")}
                  className="text-yellow-400 hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!posts.length) return <p>No posts available</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Logout Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-800 border border-yellow-500 p-5 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h4 className="text-xl font-semibold text-yellow-400 mb-2">
              {post.author.name}
            </h4>
            <p className="text-gray-300 text-sm">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
