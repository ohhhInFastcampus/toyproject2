"use client";

import Image from "next/image";
import User from "./User";
import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 0 15px;

  &:hover {
    background-color: #f0f0f0;
    height: 40px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
  }
`;
const Gnb = () => {
  return (
    <>
      <Link href="/" passHref>
        <StyledLink>HOME</StyledLink>
      </Link>
      <Link href="/pay" passHref>
        <StyledLink>급여내역</StyledLink>
      </Link>
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
  //추후에 user data 삭제할 예정
  const user = {
    userId: "user1",
    name: "최홍주",
    profile: "/next.svg",
  };

  return (
    <HeaderContainer>
      <Image src="/next.svg" alt="profile picture" width={100} height={100} />
      <Gnb />
      <User {...user} />
    </HeaderContainer>
  );
};
export default Header;
