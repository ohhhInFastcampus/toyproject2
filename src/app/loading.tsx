"use client";
import { Spinner } from "react-spinners-css";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // 전체 뷰포트 높이를 사용하여 컨테이너를 화면에 꽉 차게 합니다.
`;

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    </>
  );
}
