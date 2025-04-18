import React from "react";
import { useAuth } from "../../context/Auth";

const CommentSection = ({ comments = [], handleStatusChange }) => {
  const { userState } = useAuth();
  return (
    <div className="w-full mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Comments</h2>

      {comments?.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment?._id}
              className="bg-white border rounded-md shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <p className="text-blue-700 font-medium">
                    {comment?.userId?.emailOrUserName}
                  </p>
                  <p className="text-gray-700 mt-1">{comment?.comment}</p>
                </div>
                {userState?.role === "admin" && (
                  <div className="mt-2 md:mt-0 flex items-center gap-2">
                    <label
                      htmlFor={`status-${comment?._id}`}
                      className="text-sm font-medium text-gray-600"
                    >
                      Status:
                    </label>
                    <select
                      id={`status-${comment?._id}`}
                      value={comment?.status}
                      onChange={(e) =>
                        handleStatusChange(comment?._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
