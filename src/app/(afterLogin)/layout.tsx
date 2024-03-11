"use client";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <PageContainer>
        <div>{children}</div>
      </PageContainer>
      <Footer currentYear={2017} />
    </>
  );
}
