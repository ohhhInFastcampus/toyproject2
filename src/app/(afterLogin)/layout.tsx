"use client";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import theme from "@/styles/theme";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${theme.colors.lightGrey};
  padding: 3rem;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <PageContainer>
        <div>{children}</div>
      </PageContainer>
      <Footer currentYear={2024} />
    </>
  );
}
