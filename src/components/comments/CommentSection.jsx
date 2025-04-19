import React, { useEffect, useRef } from "react";
import { useAuth } from "../../context/Auth";
import { formatDistanceToNow } from "date-fns";
import Loader from "../../ui/Loader";

const CommentSection = ({
  comments = [],
  handleStatusChange,
  fetchMoreComments,
  hasMore,
  loading,
}) => {
  const { userState } = useAuth();
  const scrollRef = useRef();

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || loading || !hasMore) return;

    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 50
    ) {
      fetchMoreComments();
    }
  };

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", handleScroll);
    }
    return () => current?.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const getStatusBadgeClass = (status) => {
    return status === "Approved"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="w-full">
      {comments?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No comments yet.</p>
        </div>
      ) : (
        <div ref={scrollRef} className="space-y-6 h-[450px] overflow-auto">
          {comments.map((comment) => {
            const timeAgo = comment?.createdAt
              ? formatDistanceToNow(new Date(comment?.createdAt), {
                  addSuffix: true,
                })
              : "recently";

            return (
              <div
                key={comment?._id}
                className="bg-white border border-gray-100 rounded-lg shadow-sm p-5 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                    {getInitials(comment?.userId?.emailOrUserName)}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      {/* User Info & Comment Header */}
                      <div>
                        <p className="font-medium text-gray-800">
                          {comment?.userId?.emailOrUserName || "Anonymous User"}
                        </p>
                        <p className="text-xs text-gray-500">{timeAgo}</p>
                      </div>

                      {/* Admin Controls */}
                      {userState?.role === "admin" && (
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full shadow-sm">
                          <span className="text-xs font-medium text-gray-600">
                            Status:
                          </span>
                          <select
                            id={`status-${comment?._id}`}
                            value={comment?.status || "Pending"}
                            onChange={(e) =>
                              handleStatusChange(comment?._id, e.target.value)
                            }
                            className="text-sm font-medium border-0 bg-transparent focus:outline-none focus:ring-0 pr-6 py-0 appearance-none cursor-pointer"
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 0.25rem center",
                              backgroundSize: "1rem",
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                          </select>
                        </div>
                      )}

                      {/* Status Badge (for non-admins) */}
                      {userState?.role !== "admin" && comment?.status && (
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full border ${getStatusBadgeClass(
                            comment?.status
                          )}`}
                        >
                          {comment?.status}
                        </span>
                      )}
                    </div>

                    {/* Comment Content */}
                    <div className="mt-3">
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-center py-4">
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
