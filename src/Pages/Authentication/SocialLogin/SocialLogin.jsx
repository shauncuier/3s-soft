import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div className="flex items-center justify-center">
      
      <button className="btn bg-white text-black border-[#e5e5e5] mt-5 w-3/4">
        <FcGoogle size={20} />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
