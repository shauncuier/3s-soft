import React, { useState } from "react";
import axios from "axios";
import SectionLabel from "../../../Components/SectionLabel";
// import loginLottie from "../../../assets/lottie-files/login-lottie.json";
// import Lottie from "lottie-react";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    setUploading(true);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      const url = res.data.data.display_url;
      setImageUrl(url);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with image URL:", imageUrl);
  };

  return (
    <section className="bg-gray-900 transition-colors duration-300 px-4">
      <div className="max-w-[1480px] min-h-screen mx-auto pt-30 pb-20">
        <div className="text-center mb-8">
          <SectionLabel label={"Create Your Account in 3s-soft"} />
        </div>
        <div className="max-w-4xl mx-auto bg-blue-900/30 border shadow-sm shadow-blue-200 rounded-2xl p-10">
          <div className="flex">
            <div className="flex-1 flex items-center justify-center">
              {/* <Lottie animationData={loginLottie} loop={true} /> */}
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="text-sm font-semibold">Name</label>
                  <input type="text" className="input mt-1 bg-white/20 w-full" placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                  <label className="text-sm font-semibold">Email</label>
                  <input type="email" className="input mt-1 bg-white/20 w-full" placeholder="Email" required />
                </div>
                <div className="mb-3">
                  <label className="text-sm font-semibold">Password</label>
                  <input type="password" className="input mt-1 bg-white/20 w-full" placeholder="Password" required />
                </div>
                <div className="mb-8">
                  <label className="text-sm font-semibold">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input mt-1 bg-white/20 w-full"
                  />
                  {uploading && <p className="text-sm text-blue-400 mt-2">Uploading...</p>}
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="mt-3 w-20 h-20 object-cover rounded-full"
                    />
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="text-sm font-medium py-4 w-full sm:w-3/4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-sm hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="divider mb-0">OR</div>
              <SocialLogin />
            </div>
          </div>
          <div className="flex items-center justify-center mt-8">
            <p className="text-sm">
              Already have an Account?{" "}
              <Link to={"/login"} className="font-medium text-blue-400">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
