"use client";
import { Spinner } from "react-spinners-css";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function Loading() {
  return (
    <>
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    </>
  );
}
