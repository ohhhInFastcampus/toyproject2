// useHandleLogout 훅 수정
"use client";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { logout } from "../slice/slice";
import { useDispatch } from "react-redux";

const useHandleLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout(undefined));
        router.push("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        alert("Log out에 실패했습니다");
      });
  };

  return handleLogout;
};

export default useHandleLogout;
