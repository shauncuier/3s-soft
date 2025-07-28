import React, { useContext, useState } from "react";
import axios from "axios";
import SectionLabel from "../../../Components/SectionLabel";
import logo from "../../../assets/logo.jpg";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import registerImage from "../../../assets/register-image.jpg";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { registerUser, updateUser, setUser, loading, setLoading } =
    useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    setUploading(true);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      const url = res.data.data.display_url;
      setImageUrl(url);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
    setUploading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const regExLength = /.{6,}/;
    // Validate password
    if (!regExLength.test(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await registerUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: imageUrl });
      setUser({ ...user, displayName: name, photoURL: imageUrl });
      toast.success("Account Create Successfully");
      navigate("/");
    } catch (error) {
      console.error("Caught error:", error);
      const code = error.code;
      let errMsg = error.message || "Registration failed";
      if (code === "auth/email-already-in-use") {
        errMsg = "Email already in use. Please log in.";
      }
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading.........</p>;
  }

  return (
    <section className="bg-gray-900 transition-colors duration-300 px-4">
      <div className="max-w-[1480px] min-h-screen mx-auto pt-30 pb-20">
        <div className="text-center mb-5">
          <SectionLabel label={"Create Your Account in 3s-soft"} />
        </div>
        <div className="max-w-4xl mx-auto bg-black/20 border shadow-sm shadow-blue-200 rounded-2xl overflow-hidden">
          <div className="flex">
            <div className="flex-1 hidden sm:flex items-center justify-center">
              <img
                src={registerImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 py-10 px-5">
              <div className="mb-5">
                <div className="flex gap-2 items-center mb-5">
                  <img src={logo} alt="" className="max-w-8 rounded-full" />
                  <h3 className="text-lg font-medium">3S-SOFT</h3>
                </div>
                <h4 className="text-3xl font-bold">Welcome 3S-SOFT</h4>
                <p className="mt-1 text-sm text-gray-400">
                  Please enter your details . . .
                </p>
              </div>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="text-sm font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input mt-1 bg-white/20 w-full"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input mt-1 bg-white/20 w-full"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="text-sm font-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input mt-1 bg-white/20 w-full"
                    placeholder="Password"
                    required
                  />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-8">
                  <label className="text-sm font-semibold">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageUpload}
                    className="file-input mt-1 bg-white/20 w-full"
                  />
                  {uploading && (
                    <p className="text-sm text-blue-400 mt-2">Uploading...</p>
                  )}
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
              <div className="flex items-center justify-center mt-5">
                <p className="text-sm">
                  Already have an Account?{" "}
                  <Link to={"/login"} className="font-medium text-blue-400">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
