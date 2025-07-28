import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#020817]">
      <h3 className="text-3xl font-semibold">
        Hey User ! Welcome 3s-soft Dashboard
      </h3>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div className="py-10 px-5 bg-white/30 rounded-md flex flex-col items-center justify-center">
          {user && (
            <>
              <img
                src={user.photoURL}
                alt=""
                className="w-14 h-14 rounded-full"
              />
              <p className="text-2xl mt-3">{user.displayName}</p>
              <p className="mt-1">{user.email}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
