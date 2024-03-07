"use client";
import React, { FormEventHandler, useRef, useState } from "react";
import LoginForm from "../../components/LoginForm";
import styled from "styled-components";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/app/_slice/slice";

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
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  const formAction: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email && !password) return;
    try {
      //firebase 인증
      // setPersistence(auth, browserSessionPersistence); //세션설정
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      const authConstructor = {
        email: user.email,
        uid: user.uid,
        token: token,
      };
      dispatch(login(authConstructor));
      router.push("/pay");
    } catch (error) {
      setError("아이디 또는 비밀번호가 다릅니다.");
    }
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  return (
    <StyledContainer>
      <LoginForm
        // loginFn={login}
        error={error}
        onSubmit={formAction}
        formRef={formRef}
      />
    </StyledContainer>
  );
};

export default LoginPage;
