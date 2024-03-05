"use client";

import Image from "next/image";
import User from "./User";
import styled from "styled-components";
import Link from "next/link";

const Gnb = () => {
  return (
    <>
      <Link href="/">HOME</Link>
      <Link href="/pay">급여내역</Link>
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Header = () => {
  return (
    <HeaderContainer>
      <Image src="/next.svg" alt="profile picture" width={100} height={100} />
      <Gnb />
      <User />
    </HeaderContainer>
  );
};
export default Header;
