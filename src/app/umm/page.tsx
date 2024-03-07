"use client";
import Image from "next/image";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useState } from "react";
import useAuth from "@/app/useAuth";
import { useSelector } from "react-redux";
// import { selectUser } from "./_slice/slice";

export default function Home() {
  useAuth();
  return (
    <>
      <div>로그인 인증</div>
    </>
  );
}
