"use client";

import Image from "next/image";
import User from "./User";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import theme from "@/styles/theme";
import { Logout } from "./Logout";
import useHandleLogout from "@/hooks/useHandleLogout";
import { useAuthContext } from "@/app/UseAuthProvider";

const StyledLink = styled.div`
  &:hover {
    color: ${theme.colors.blue};
    font-weight: 700;
    cursor: pointer;
  }
  & a {
    color: inherit;
    text-decoration: none;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3rem;
  height: 4rem;
  border-bottom: 1px solid #e0e0e0;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 5rem;
  background-color: #e0e0e0;
  border-radius: ${theme.border.radius};
  width: 60px;
  padding: 5px;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.blue};
    cursor: pointer;
  }
`;

const Gnb = () => {
  return (
    <>
      <StyledLink>
        <Link href="/" passHref>
          캘린더
        </Link>
      </StyledLink>

      <StyledLink>
        <Link href="/pay" passHref>
          급여내역
        </Link>
      </StyledLink>
      <StyledLink>
        <Link href="/request" passHref>
          정정 신청
        </Link>
      </StyledLink>
    </>
  );
};

const Header = () => {
  const { isAuthenticated } = useAuthContext() ?? { isAuthenticated: false };
  const [logout, setLogout] = useState(false);

  const handleLogout = useHandleLogout();

  return (
    <HeaderContainer>
      <Image src="/logo.png" alt="logo" width={80} height={40} />
      <Gnb />
      {isAuthenticated ? (
        <UserContainer onClick={() => setLogout(!logout)}>
          <User />
          {logout && <Logout onLogout={handleLogout} />}
          <Image src="/down.svg" alt="down icon" width={20} height={20} />
        </UserContainer>
      ) : (
        <div>Loading user...</div>
      )}
    </HeaderContainer>
  );
};
export default Header;
