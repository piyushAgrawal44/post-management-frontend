import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { usePost } from "../../context/Posts";
import Loader from "../../ui/Loader";
import { PenLine, AlertCircle } from "lucide-react";

const Home = () => {
  const { token } = useAuth();
  const { loading, createPostApi } = usePost();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    comparison: ""
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const validateForm = () => {
    const newErrors = {
      title: "",
      content: "",
      comparison: ""
    };
    let isValid = true;

    // Check if title is empty
    if (!title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    // Check if content is empty
    if (!content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    }

    // Check if content is longer than title
    if (title.trim() && content.trim() && content.length <= title.length) {
      newErrors.comparison = "Content must be longer than the title";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await createPostApi(title, content);
    setTitle("");
    setContent("");
    setCharCount(0);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-indigo-100 rounded-full opacity-50"></div>
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PenLine className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Create Post
            </h2>
          </div>

          {/* Success message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Post created successfully!</span>
            </div>
          )}

          {/* Comparison error message */}
          {errors.comparison && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{errors.comparison}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                className={`w-full border ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors({...errors, title: ""});
                  }
                  if (errors.comparison && e.target.value.length < content.length) {
                    setErrors({...errors, comparison: ""});
                  }
                }}
                placeholder="Give your post a title"
              />
              {errors.title && (
                <p className="mt-1 text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title}
                </p>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-medium">
                  Content
                </label>
                <span className={`text-sm ${content.length > 0 ? 'text-gray-500' : 'text-red-500'}`}>
                  {charCount} characters
                </span>
              </div>
              <textarea
                className={`w-full border ${errors.content ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700`}
                rows="8"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) {
                    setErrors({...errors, content: ""});
                  }
                  if (errors.comparison && e.target.value.length > title.length) {
                    setErrors({...errors, comparison: ""});
                  }
                }}
                placeholder="Write your post content here..."
              ></textarea>
              {errors.content && (
                <p className="mt-1 text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.content}
                </p>
              )}
            </div>
            
            <div className="flex justify-end pt-2">
              <button
                disabled={loading}
                type="submit"
                className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition duration-200 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader color={"text-white"} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Publish Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;