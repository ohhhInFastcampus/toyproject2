import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "@/slice/slice";
import { auth } from "@/firebase";

const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // 사용자가 인증되지 않았을 경우
          router.push("/login");
          dispatch(logout());
        } else {
          // 사용자가 인증된 경우
          const token = await user.getIdToken();
          const authConstructor = {
            email: user.email,
            uid: user.uid,
            token: token,
          };

          dispatch(login(authConstructor));
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      });
    })();
  }, [router, dispatch]);

  return { isLoading, isAuthenticated };
};

export default useAuth;
