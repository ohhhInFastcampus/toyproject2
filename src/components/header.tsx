"use client";

import Image from "next/image";
import User from "./User";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { UserType } from "../type/UserType";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData: UserType = {
          userId: user.uid,
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

  return (
    <HeaderContainer>
      <Image src="/next.svg" alt="profile picture" width={100} height={100} />
      <Gnb />
      {currentUser ? <User {...currentUser} /> : <div>Loading user...</div>}
    </HeaderContainer>
  );
};
export default Header;
