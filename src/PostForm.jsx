import React, { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add Bearer here
          },
        }
      );

      setContent("");
      onPostCreated(response.data); // Notify parent to refresh posts
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  return (
    <form onSubmit={handlePostSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 rounded-lg border-2 border-yellow-500"
        placeholder="What’s on your mind?"
        rows="4"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
