"use client";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import LoginForm from "../../../components/LoginForm";
import styled from "styled-components";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import { login, setLoadingState } from "@/slice/slice";
import { useRouter } from "next/navigation";
import fetchImgFromFireStorage from "@/utils/getUserImage";

const StyledContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  const formAction: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email && !password) {
      setError("이메일 또는 아이디를 입력해주세요.");
      return;
    }
    try {
      //firebase 인증
      // setPersistence(auth, browserSessionPersistence); //세션설정
      dispatch(setLoadingState({ isLoading: true }));
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();

      let PhotoURL = user.photoURL;
      if (!user.photoURL) {
        try {
          PhotoURL = await fetchImgFromFireStorage(email);
        } catch (e) {
          PhotoURL = null;
        }
      }

      const authConstructor = {
        email: user.email,
        uid: user.uid,
        photoURL: PhotoURL,
        token: token,
      };
      router.replace("/");
      dispatch(login(authConstructor));
      setUser(user);
    } catch (error) {
      setError("아이디 또는 비밀번호가 다릅니다.");
    }
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(setLoadingState({ isLoading: true }));
      router.replace("/");
    }
  }, [user, router, dispatch]);
  return (
    <StyledContainer>
      <LoginForm error={error} onSubmit={formAction} formRef={formRef} />
    </StyledContainer>
  );
};

export default LoginPage;
