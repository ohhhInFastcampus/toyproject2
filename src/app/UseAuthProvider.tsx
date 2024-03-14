"use client";
import React, { createContext, useContext, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "./loading";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "next/router";
import { setLoadingState } from "@/slice/slice";

interface AuthContextType {
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {isLoading ? <Loading></Loading> : children}
    </AuthContext.Provider>
  );
};
