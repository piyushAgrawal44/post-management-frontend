import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { usePost } from "../../context/Posts";
import Loader from "../../ui/Loader";

const Home = () => {
  const { token } = useAuth();
  const { loading, createPostApi } =
    usePost();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPostApi(title, content);
    setTitle("")
    setContent("")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-blue-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              required
            />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-2">
              Content
            </label>
            <textarea
              className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here..."
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 text-white font-semibold w-42 py-2 rounded-lg hover:bg-blue-600 flex justify-center transition duration-200"
            >
              {loading ? <Loader color={"text-white"} /> : "Submit Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
