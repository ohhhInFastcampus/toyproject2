"use client";

import Image from "next/image";
import User from "./User";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserType } from "@/type/UserType";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import Button from "./Button";

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
      <Link href="/request" passHref>
        <StyledLink>정정 신청</StyledLink>
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
      <Image src="/next.svg" alt="profile picture" width={100} height={100} />
      <Gnb />
      {currentUser ? (
        <>
          <User {...currentUser} onClick={() => setLogout(!logout)} />
          {logout && <Button onClick={handleLogout}>로그아웃</Button>}
        </>
      ) : (
        <div>Loading user...</div>
      )}
    </HeaderContainer>
  );
};
export default Header;
