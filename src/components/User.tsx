"use client";

import Image from "next/image";
import styled from "styled-components";
import { UserType } from "../type/UserType";

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  height: 40px;
  padding: 0 15px;
  border-radius: 10px;
`;

const UserName = styled.div`
  margin-left: 10px;
  font-size: 15px;
`;

const User = ({ name, profile }: UserType) => {
  return (
    <UserContainer>
      <Image src={profile} alt="profile picture" width={70} height={70} />
      <UserName>{name}</UserName>
    </UserContainer>
  );
};

export default User;
