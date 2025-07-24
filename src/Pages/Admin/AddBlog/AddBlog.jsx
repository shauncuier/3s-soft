import React, { useState } from "react";
import SectionLabel from "../../../Components/SectionLabel";
import axios from "axios";
import toast from "react-hot-toast";

const predefinedTags = [
  "web development",
  "graphic design",
  "seo",
  "lead generation",
];

const AddBlog = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");

  const handleCheckboxChange = (e) => {
    const tag = e.target.value;
    setSelectedTags((prev) =>
      e.target.checked ? [...prev, tag] : prev.filter((t) => t !== tag)
    );
  };

  const handleCustomTagAdd = () => {
    const trimmedTag = customTag.trim();
    if (trimmedTag && !selectedTags.includes(trimmedTag)) {
      setSelectedTags((prev) => [...prev, trimmedTag]);
      setCustomTag("");
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const form = e.target;
    const author = form.author.value;
    const title = form.title.value;
    const date = form.date.value;
    const imageUrl = form.image.value;
    const details = form.details.value;

    const blogData = {
      author,
      title,
      date,
      imageUrl,
      details,
      tags: selectedTags,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        blogData
      );
      toast.success("Blog Added successfully!");
      setSelectedTags([]);
    } catch (err) {
      toast.error("Error adding blog:", err.response?.data || err.message);
    }

    form.reset();
  };

  return (
    <section className="bg-gray-900 transition-colors duration-300 px-4">
      <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-34 pb-20">
        <div className="text-center mb-8">
          <SectionLabel label={"Add Blog"} />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Add New Blog Post
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create and manage blog content for your website. Use the form below
            to add a new post, update existing content, and keep your readers
            engaged with fresh insights.
          </p>
        </div>
        <div className="bg-[#1E2939] border border-gray-400 rounded-2xl px-5 py-10 max-w-4xl mx-auto shadow-md shadow-blue-300">
          <form
            onSubmit={handleAddBlog}
            className="grid grid-cols-2 gap-5 gap-y-10"
          >
            <div className="flex flex-col col-span-2">
              <label className="text-sm font-medium italic text-blue-100 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="input w-full bg-black/30 outline-none focus:outline-0 focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium italic text-blue-100 mb-2">
                Author Name
              </label>
              <input
                type="text"
                name="author"
                required
                className="input w-full bg-black/30 outline-none focus:outline-0 focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium italic text-blue-100 mb-2">
                Blog Image URL
              </label>
              <input
                type="text"
                name="image"
                required
                className="input w-full bg-black/30 outline-none focus:outline-0 focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium italic text-blue-100 mb-2">
                Post Date
              </label>
              <input
                type="date"
                name="date"
                className="input w-full bg-black/30 outline-none focus:outline-0 focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-sm font-medium italic text-blue-100 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-4 mb-4">
                {predefinedTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center space-x-2 text-white"
                  >
                    <input
                      type="checkbox"
                      value={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={handleCheckboxChange}
                      className="accent-blue-500"
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Add custom tag"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  className="input w-full bg-black/30 text-white outline-none focus:outline-0 focus:border-blue-300"
                />
                <button
                  type="button"
                  onClick={handleCustomTagAdd}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-blue-700 cursor-pointer transition duration-300 font-medium"
                >
                  Add
                </button>
              </div>
              {selectedTags.length > 0 && (
                <div className="mt-3 text-sm text-blue-200 italic">
                  Selected Tags: {selectedTags.join(", ")}
                </div>
              )}
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium italic text-blue-100">
                Blog Details
              </label>
              <textarea
                rows={6}
                name="details"
                required
                placeholder="Blog Details"
                className="textarea w-full mt-2 bg-black/30 outline-none focus:outline-0 focus:border-blue-300"
              ></textarea>
            </div>

            <div className="col-span-2">
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 px-8 py-4 font-semibold flex items-center justify-center gap-2 transition duration-300 cursor-pointer text-lg w-1/2 mx-auto"
                type="submit"
              >
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBlog;
