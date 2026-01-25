import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // for dynamic route
import axios from "axios";
import PageTitle from "../../../Components/PageTitle";
import dummyBlogs from "../../../data/blogs.json";

const BlogDetails = () => {
  const { id } = useParams(); // Get :id from route
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error, falling back to dummy data:", err);
        const dummy = dummyBlogs.find(b => b._id === id);
        if (dummy) {
          setBlog(dummy);
          setLoading(false);
        } else {
          setError(err.response?.data?.message || "Something went wrong");
          setLoading(false);
        }
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="bg-gray-900 transition-colors duration-300 px-4">
      {blog && (
        <PageTitle
          title={`${blog.title} | 3s-Soft Blog`}
          content={blog.details?.substring(0, 150)}
        />
      )}
      <div className="max-w-4xl min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{blog.title}</h1>
        <div className="flex items-center gap-4 text-sm text-blue-400 mb-8">
          <span>By {blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>
        <img src={blog.imageUrl} alt={blog.title} className="w-full rounded-2xl mb-8" />
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
          {blog.details}
        </div>
        <p className="mt-8 text-blue-400 font-semibold">{blog.category || "General"}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
