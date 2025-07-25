import React from "react";
import SectionLabel from "../../../Components/SectionLabel";
import logo from "../../../assets/logo.jpg";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import loginImage from "../../../assets/login-image.jpg";

const Login = () => {
  return (
    <section className="bg-gray-900 transition-colors duration-300 px-4">
      <div className="max-w-[1480px] mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
        <div className="text-center mb-5">
          <SectionLabel label={"Login in 3s-soft"} />
        </div>
        <div className="max-w-3xl mx-auto bg-black/20 border shadow-sm shadow-blue-200 rounded-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 hidden sm:flex items-center justify-center">
              <img
                src={loginImage}
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
                <h4 className="text-3xl font-bold">Welcome Back</h4>
                <p className="mt-1 text-sm text-gray-400">Please enter your details . . .</p>
              </div>
              <form className="">
                <div className="mb-3">
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input focus:border focus:border-blue-500 outline-none focus:outline-none mt-1 bg-white/20 w-full"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="text-sm font-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input focus:border focus:border-blue-500 outline-none focus:outline-none mt-1 bg-white/20 w-full"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="text-sm font-medium py-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-sm hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="divider mb-0">OR</div>
              <SocialLogin />
              <p className="text-sm text-center mt-5">
                Don't have an Account?{" "}
                <Link to={"/register"} className="font-medium text-blue-400">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
