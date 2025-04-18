import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CommentSection from "../../components/comments/CommentSection";
import { usePost } from "../../context/Posts";
import Loader from "../../ui/Loader";

const SinglePost = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const {
    loading,
    comments,
    setComments,
    getCommentsApi,
    addCommentsApi,
    approveCommentsApi,
  } = usePost();

  const [comment, setComment] = useState("");

  const commentHandler = async (e) => {
    e.preventDefault();
    await addCommentsApi(comment, id);
    setComment("");
  };

  const handleStatusChange = async (postId, status) => {
    const data = await approveCommentsApi(postId, status);
    if (data) {
      await setComments([]);
      await getCommentsApi(id, 1, 10);
    }
  };

  useEffect(() => {
    if (id) {
      getCommentsApi(id, 1, 10);
    }
  }, [id, state]);

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Post Info */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6 border">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          {state?.title}
        </h1>
        <p className="text-gray-700 text-lg mb-4">{state?.content}</p>
        <div className="text-sm text-gray-500">
          Posted by:{" "}
          <span className="font-medium text-blue-500">
            {state?.userId?.emailOrUserName}
          </span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Comments: <span className="font-semibold">{state?.comments}</span>
        </div>
      </div>
      {/* Comment Form */}
      <div className="bg-white shadow-md rounded-md p-6 border">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Leave a Comment
        </h2>
        <form onSubmit={commentHandler}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Write your comment..."
            className="w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 w-42 rounded-md transition-all duration-200 flex justify-center"
          >
            {loading ? <Loader color={"text-white"} /> : "Submit Comment"}
          </button>
        </form>
      </div>
      {/* All Comments */}
      <CommentSection
        comments={comments}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default SinglePost;
