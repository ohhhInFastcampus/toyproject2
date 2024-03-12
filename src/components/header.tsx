"use client";

import Image from "next/image";
import User from "./User";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserType } from "@/type/UserType";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import theme from "@/styles/theme";
import { Logout } from "./Logout";

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
  margin: 30px;
  width: 100%;
  height: 5rem;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 5rem;
  background-color: ${theme.colors.lightGrey};
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
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData: UserType = {
          name: user.displayName || "",
          email: user.email || "",
          profile: user.photoURL || "",
        };
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      setLogout(false);
    });
  };

  return (
    <HeaderContainer>
      <Image src="/logo.png" alt="logo" width={80} height={40} />
      <Gnb />
      {currentUser ? (
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
