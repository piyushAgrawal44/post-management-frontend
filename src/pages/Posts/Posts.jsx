import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { usePost } from "../../context/Posts";
import Loader from "../../ui/Loader";

const Posts = () => {
  const { token } = useAuth();
  const { allPostLoading, posts, getAllPostsApi } = usePost();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    if (token) {
      getAllPostsApi(currentPage, limit);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        All Posts
      </h1>

      {allPostLoading ? (
        <div className="flex justify-center py-5">
          <Loader />
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post?._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {post?.title}
                </h2>
                <Link
                  to={`/single-post/${post?._id}`}
                  state={post}
                  className="text-sm hover:underline cursor-pointer font-semibold text-blue-700 mb-2"
                >
                  View
                </Link>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                {post?.content?.length > 100
                  ? post?.content.slice(0, 100) + "..."
                  : post?.content}
              </p>
              <div className="text-sm text-gray-500 mb-2">
                <span className="font-medium text-blue-500">By:</span>{" "}
                {post?.userId?.emailOrUserName || "Unknown"}
              </div>
              <Link  to={`/single-post/${post?._id}`}  state={post} className="text-sm hover:underline  text-gray-500">
                <span className="font-medium text-blue-500">Comments:</span>{" "}
                {post?.comments}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 font-medium">
          No posts found.
        </div>
      )}
    </div>
  );
};

export default Posts;
