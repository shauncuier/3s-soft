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

const categories = [
  "Web Development",
  "WordPress",
  "Product Listing",
  "Lead Generation",
  "Digital Marketing & SEO",
  "Social Media Marketing",
  "Graphic Design",
  "Virtual Assistant Services",
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
    const category = form.category.value;
    const imageUrl = form.image.value;
    const details = form.details.value;

    const blogData = {
      author,
      title,
      date,
      category,
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
    <section className="bg-[#020817] transition-colors duration-300 px-4">
      <div className="max-w-370 min-h-screen mx-auto p-10">
        <div className="text-center">
          <SectionLabel label={"Add Blog"} />
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
                placeholder="Blog Title"
                required
                className="input w-full bg-black/30 outline-none focus:outline-0 focus:border-blue-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium italic text-blue-100 mb-2">
                Blog Image
              </label>
              <input
                type="text"
                name="image"
                placeholder="Blog Image URL"
                required
                className="input w-full bg-black/30 outline-none focus:outline-0 focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium italic text-blue-100 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                placeholder="Author Name"
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
            <div className="flex flex-col">
              <label className="text-sm font-medium italic text-blue-100 mb-2">
                Category
              </label>
              <select
                name="category"
                required
                className="input w-full bg-black/30 text-white outline-none focus:outline-0 focus:border-blue-300"
              >
                <option value="" className="bg-gray-600 text-white">
                  Select a category
                </option>
                {categories.map((cat, index) => (
                  <option
                    key={index}
                    value={cat}
                    className="bg-black text-white"
                  >
                    {cat}
                  </option>
                ))}
              </select>
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
                  className="bg-linear-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-blue-700 cursor-pointer transition duration-300 font-medium"
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
                className="bg-linear-to-r from-blue-500 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 px-8 py-4 font-semibold flex items-center justify-center gap-2 transition duration-300 cursor-pointer text-lg w-1/2 mx-auto"
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
