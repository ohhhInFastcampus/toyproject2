"use client";

import Image from "next/image";
import User from "./User";
import styled from "styled-components";

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
      <User />
    </HeaderContainer>
  );
};
export default Header;
