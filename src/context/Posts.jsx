import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../interceptor/interceptor";

const PostContext = createContext(undefined);

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within an PostProvider");
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allPostLoading, setAllPostLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // for posts
  const createPostApi = async (title, content) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/posts/create-post`, {
        title,
        content,
      });
      if (data) {
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message === "Email is already in use") {
        navigate("/login");
      }
      console.log("error", error);
    }
  };
  const getAllPostsApi = async (page, limit) => {
    try {
      setAllPostLoading(true);
      const { data } = await axiosInstance.get(
        `/posts/get-post?page=${page}&limit=${limit}`
      );
      if (data) {
        setPosts(data?.data);
        setAllPostLoading(false);
      }
    } catch (error) {
      setAllPostLoading(false);
      console.log("error", error);
    }
  };

  // for comments
  const approveCommentsApi = async (id, status) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.put(`/posts/${id}/approve-comment`, {
        status,
      });
      if (data) {
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const addCommentsApi = async (comment, id) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/posts/${id}/add-comment`, {
        comment,
      });
      if (data) {
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const getCommentsApi = async (id, pageNum, limit) => {
    try {
      setAllPostLoading(true);
      const { data } = await axiosInstance.get(
        `/posts/${id}/all-comments?page=${pageNum}&limit=${limit}`
      );
      if (!data?.data?.allComments?.length) {
        setPage((prev) => prev);
        setHasMore(false);
        setAllPostLoading(false);
      }
      if (data) {
        setCommentCount(data?.data?.commentCount);
        setComments((prev) => {
          const existingIds = new Set(prev.map((comment) => comment._id));
          const newUniqueComments = data?.data?.allComments.filter(
            (comment) => !existingIds.has(comment._id)
          );
          return [...prev, ...newUniqueComments];
        });
        setPage((prev) => prev + 1);
        setAllPostLoading(false);
      }
    } catch (error) {
      setAllPostLoading(false);
      console.log("error", error);
    }
  };

  const all_states = {
    loading,
    hasMore,
    page,
    allPostLoading,
    comments,
    commentCount,
    posts,
  };
  const all_states_update_func = {
    setComments,
  };

  const all_api_controllers = {
    createPostApi,
    getAllPostsApi,
    approveCommentsApi,
    addCommentsApi,
    getCommentsApi,
  };

  return (
    <PostContext.Provider
      value={{
        ...all_states,
        ...all_states_update_func,
        ...all_api_controllers,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
