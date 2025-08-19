import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: token },
        });

        console.log("User data fetched:", res.data);
        setUser(res.data);
      } catch (err) {
        setError("Access denied or session expired.");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 border border-yellow-500 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">
          Welcome back, {user.name || "Hero"}!
        </h2>

        <p className="text-lg text-gray-300 mb-2">
          Here's your secret identity profile:
        </p>

        <div className="mt-4 space-y-2">
          <p>
            <span className="text-yellow-400 font-semibold">Name:</span>{" "}
            {user.name || "Unknown"}
          </p>
          <p>
            <span className="text-yellow-400 font-semibold">Email:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="text-yellow-400 font-semibold">Age:</span>{" "}
            {user.age || "Classified"}
          </p>
          <p>
            <span className="text-yellow-400 font-semibold">Race:</span>{" "}
            {user.race || "Unknown Entity"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
