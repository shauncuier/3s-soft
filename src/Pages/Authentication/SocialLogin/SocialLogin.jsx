import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    console.log("handle google login clicked")
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] mt-5 w-3/4"
      >
        <FcGoogle size={20} />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
