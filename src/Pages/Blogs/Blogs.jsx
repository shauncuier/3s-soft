import { FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import SectionLabel from "../../Components/SectionLabel";

const Blogs = () => {
  const blogs = [
    {
      _id: "1",
      imageUrl:
        "https://images.pexels.com/photos/32568175/pexels-photo-32568175.jpeg",
      author: "3s-Soft",
      date: "20-07-2025",
      title: "Young Woman Cycling in Parisian Park",
      details:
        "A young woman pedals gracefully through a sun-dappled path in a Parisian park. She wears a light summer dress, fluttering gently in the breeze. Lush green trees line the trail, casting playful shadows on the cobblestone. A wicker basket on her vintage bicycle holds fresh flowers and a baguette. Children laugh nearby, and lovers stroll hand in hand along the Seine. The Eiffel Tower peeks through the foliage, adding charm to the serene scene.",
      tags: ["cycling", "girl", "Park"],
    },
    {
      _id: "2",
      imageUrl:
        "https://images.pexels.com/photos/3109835/pexels-photo-3109835.jpeg",
      author: "3s-Soft",
      date: "22-07-2025",
      title: "Morning Coffee by the Seine",
      details:
        "A young man sits quietly at a riverside café, sipping his morning espresso. The golden light of sunrise dances on the rippling water. Street musicians play soft jazz nearby, filling the air with a Parisian charm. Pigeons flutter past as boats glide silently down the Seine. He scribbles in a journal, lost in thoughts and the scent of fresh croissants. The Eiffel Tower looms softly in the distance, veiled by morning mist.",
      tags: ["coffee", "Seine", "Paris"],
    },
    {
      _id: "3",
      imageUrl:
        "https://images.pexels.com/photos/1883386/pexels-photo-1883386.jpeg",
      author: "3s-Soft",
      date: "24-07-2025",
      title: "Picnic Under the Cherry Blossoms",
      details:
        "A group of friends laughs under blooming cherry blossom trees in full glory. Bright picnic blankets cover the grass, dotted with wine, cheese, and fresh fruit. The air is filled with floral fragrance and spring warmth. Children run with kites while lovers share whispers beneath the petals. Camera shutters click as petals fall like pink snow. It’s a fleeting moment of joy captured in the heart of nature.",
      tags: ["picnic", "spring", "blossom"],
    },
    {
      _id: "4",
      imageUrl: "https://images.pexels.com/photos/33203383/pexels-photo-33203383.jpeg?_gl=1*1prhzqm*_ga*MTk2NDgwMjQ1LjE3MzU2NjA3NTg.*_ga_8JE65Q40S6*czE3NTM4MTA4OTkkbzc5JGcxJHQxNzUzODEyNDEwJGo5JGwwJGgw",
      author: "3s-Soft",
      date: "25-07-2025",
      title: "Evening Walk Through Montmartre",
      details:
        "Cobblestone streets wind through the charming village of Montmartre at sunset. Artists sketch portraits as cafés begin to glow with golden lamps. A couple strolls past ivy-covered buildings, hand in hand. The smell of fresh crepes wafts through the alleys. Streetlights flicker on, illuminating the old stone walls. The Sacré-Cœur Basilica stands silently, watching over the city below.",
      tags: ["Montmartre", "evening", "Paris"],
    },
    {
      _id: "5",
      imageUrl:
        "https://images.pexels.com/photos/7691365/pexels-photo-7691365.jpeg",
      author: "3s-Soft",
      date: "26-07-2025",
      title: "Rainy Afternoon in a Bookstore",
      details:
        "Raindrops tap gently on the windows of a quiet Paris bookstore. A girl curls up in the reading nook with a worn paperback in hand. The scent of old pages and coffee mingles in the cozy air. Outside, umbrellas bloom like flowers on the slick pavement. Time slows down as the storm sings softly beyond the glass. Each page turns like a heartbeat in the peaceful retreat.",
      tags: ["bookstore", "rain", "Paris"],
    },
    {
      _id: "6",
      imageUrl:
        "https://images.pexels.com/photos/2187608/pexels-photo-2187608.jpeg",
      author: "3s-Soft",
      date: "27-07-2025",
      title: "Sunset View from a Paris Rooftop",
      details:
        "From a quiet rooftop terrace, Paris spreads out like a living painting. The sky glows orange and pink as the sun dips below the horizon. Rooftops shimmer with golden light, chimneys casting long shadows. A couple clinks glasses, toasting to love and the view. The Eiffel Tower begins to sparkle in the fading dusk. It’s a moment suspended in beauty, just above the heartbeat of the city.",
      tags: ["rooftop", "sunset", "view"],
    },
  ];

  return (
    <>
      <section className="bg-gray-900 transition-colors duration-300 px-4">
        <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <SectionLabel label={"Read Our Blogs"} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Smart Reads for Smarter Growth
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Discover insightful articles from our expert team. Learn practical
              tips, explore fresh ideas, and stay inspired through every stage
              of your personal and professional growth.
            </p>
          </div>
          {blogs.length === 0 && (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {/* Single Blog */}
            {blogs.map((blog) => (
              <div
                className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col justify-between overflow-hidden"
                key={blog._id}
              >
                <div className="">
                  <div className="">
                    <img
                      src={blog.imageUrl}
                      alt="Blog Image"
                      className="w-full h-[250px] object-cover"
                    />
                  </div>
                  <div className="px-5 py-5">
                    <div className="flex items-center justify-between text-xs mt-3 font-semibold mb-3">
                      <p className="flex items-center gap-1 bg-blue-400/40 p-2 rounded">
                        <FaUserEdit /> {blog.author}
                      </p>
                      <p className="flex items-center gap-1 bg-blue-400/40 p-2 rounded">
                        <FaCalendarAlt /> {blog.date}
                      </p>
                    </div>

                    <h2 className="text-xl md:text-2xl text-blue-400">
                      {blog.title}
                    </h2>
                    <p className="mt-1">
                      {blog.details.split(" ").slice(0, 30).join(" ")}...
                      <Link
                        to={`/blog/${blog._id}`}
                        className="text-blue-500 underline"
                      >
                        Read More
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 items-start bg-blue-900 rounded px-5 py-2 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-white font-semibold">Tags:</span>
                    {blog.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/25 text-blue-100 px-2 py-0.5 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
