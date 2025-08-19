import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [race, setRace] = useState("");
  const navigate = useNavigate(); // For redirect

  const raceOptions = [
    "Human",
    "Mutant",
    "Meta-Human",
    "Alien",
    "Super Soldier",
    "Sorcerer",
    "Tech Genius",
    "Symbiote Host",
    "Atlantean",
    "Kryptonian",
    "Asgardian",
    "Speedster",
    "Time Traveler",
    "Android",
    "Shape Shifter",
    "Cosmic Entity",
    "Vigilante",
    "Dark Wizard",
    "Interdimensional Being",
    "Potato", // keep it for fun :)
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        name,
        age,
        race,
      });
      alert("Registered successfully. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-20 bg-gray-800 p-8 rounded-lg shadow-lg border border-yellow-500 text-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
        Register
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Age</label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Race</label>
        <select
          value={race}
          onChange={(e) => setRace(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="" disabled>
            Select Race
          </option>
          {raceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded transition"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
