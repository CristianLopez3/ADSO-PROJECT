import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import { getCookies } from "@/utils/cookies";
import { USER_COOKIE } from "@/service/store/auth";
import { useEffect } from "react";

const DashboardTemplate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userCookie = getCookies(USER_COOKIE);
    if (!userCookie) {
      navigate("/login");
    }
  });

  return (
    <>
      <div className="relative md:static flex bg-zinc-900">
        <Sidebar />
        <div className="w-full p-2 md:px-12 md:py-6 h-screen rounded-tl-lg rounded-bl-lg">
          <div className="max-w-[1720px] mx-auto h-full overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTemplate;
