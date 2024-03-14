"use client";
import "@/app/globals.css";
import { ReduxProvider } from "@/app/ReduxProvider";
import { AuthProvider } from "@/app/UseAuthProvider";
import "@/styles/reset.css";

import { Suspense } from "react";
import Loading from "@/app/loading";

import theme from "@/styles/theme";
import styled from "styled-components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Container = styled.div`
    background-color: ${theme.colors.lightGrey};
  `;
  return (
    <ReduxProvider>
      <AuthProvider>
        <Suspense fallback={<Loading></Loading>}>
          <Container>{children}</Container>
        </Suspense>
      </AuthProvider>
    </ReduxProvider>
  );
}
