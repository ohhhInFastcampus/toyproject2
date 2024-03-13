import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, setLoadingState } from "@/slice/slice";
import { auth } from "@/firebase";
import fetchImgFromFireStorage from "@/utils/getUserImage";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const segments = useSelectedLayoutSegment();

  useEffect(() => {
    (async () => {
      if (!(segments == "login")) {
        dispatch(setLoadingState({ isLoading: true }));
      }
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // 사용자가 인증되지 않았을 경우
          router.push("/login");
          dispatch(logout());
        } else {
          // 사용자가 인증된 경우
          const token = await user.getIdToken();
          let userPhotoURL = null;
          if (user.email) {
            userPhotoURL = await fetchImgFromFireStorage(user.email);
          }
          const authConstructor = {
            email: user.email,
            uid: user.uid,
            token: token,
            photoURL: userPhotoURL,
          };

          dispatch(login(authConstructor));

          setIsAuthenticated(true);
        }
        await setTimeout(() => {}, 5000);

        dispatch(setLoadingState({ isLoading: false }));
      });
    })();
  }, [router, dispatch, segments]);

  return { isAuthenticated };
};

export default useAuth;
