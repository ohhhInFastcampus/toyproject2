"use client";
import React, { createContext, useContext } from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "./loading";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
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
