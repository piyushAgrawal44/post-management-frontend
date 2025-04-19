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
    allPostLoading,
    hasMore,
    page,
    comments,
    commentCount,
    setComments,
    getCommentsApi,
    addCommentsApi,
    approveCommentsApi,
  } = usePost();

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const MAX_CHARS = 500;

  const commentHandler = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addCommentsApi(comment, id);
      setComment("");
      setCharCount(0);
      await getCommentsApi(id, page, 10);
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setComment(value);
      setCharCount(value.length);
    }
  };

  const handleStatusChange = async (postId, status) => {
    try {
      const data = await approveCommentsApi(postId, status);
      if (data) {
        await setComments([]);
        await getCommentsApi(id, 1, 10);
      }
    } catch (error) {
      console.error("Failed to change comment status:", error);
    }
  };

  const fetchMoreComments = async () => {
    await getCommentsApi(id, page, 10);
  };

  useEffect(() => {
    if (id) {
      getCommentsApi(id, page, 10);
    }

    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [id, state]);

  if (!state) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );
  }

  const postDate = state.createdAt
    ? state.createdAt.split("T")[0] +
      " " +
      state.createdAt.split("T")[1].split(".")[0]
    : "recently";

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          {/* Post Header */}
          <div className="bg-white shadow-lg rounded-xl p-6 mb-5 border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                  {state?.userId?.emailOrUserName?.charAt(0).toUpperCase() ||
                    "U"}
                </div>
                <div>
                  <div className="font-medium text-gray-700">
                    {state?.userId?.emailOrUserName}
                  </div>
                  <div className="text-xs text-gray-500">{postDate}</div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {state?.title}
              </h1>
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {state?.content}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                  <span className="font-medium">
                    {commentCount || 0} comments
                  </span>
                </div>
              </div>
              {state?.tags && (
                <div className="flex flex-wrap gap-2">
                  {state.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Comment Form */}
          <div className="bg-white shadow-lg rounded-xl p-6 mb-5 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Leave a Comment
            </h2>
            <form onSubmit={commentHandler}>
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  required
                  placeholder="Share your thoughts..."
                  className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {charCount}/{MAX_CHARS}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !comment.trim()}
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isSubmitting || !comment.trim()
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader color="text-white" size="small" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                      <span>Post Comment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              ></path>
            </svg>
            Comments ({comments?.length || 0})
          </h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : comments?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <p className="text-lg font-medium">No comments yet</p>
              <p className="mt-2">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <CommentSection
              comments={comments}
              handleStatusChange={handleStatusChange}
              fetchMoreComments={fetchMoreComments}
              hasMore={hasMore}
              loading={allPostLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
