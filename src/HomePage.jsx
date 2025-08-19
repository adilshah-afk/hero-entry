import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-400">Hero Registry</h1>
        <div>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mr-3"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </header>

      <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
        All Registered Superbeings
      </h2>

      {error && <p className="text-red-500">{error}</p>}
      {users.length === 0 ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-lg shadow-lg border border-yellow-500"
            >
              <p>
                <span className="font-semibold text-yellow-400">Name:</span>{" "}
                {user.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-yellow-400">Age:</span>{" "}
                {user.age || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-yellow-400">Race:</span>{" "}
                {user.race || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
