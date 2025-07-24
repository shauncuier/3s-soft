import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // for dynamic route
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams(); // Get :id from route
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="bg-gray-900 transition-colors duration-300 px-4">
      <div className="max-w-4xl min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
        <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
        <p className="">{blog.category || "Not Found"}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
