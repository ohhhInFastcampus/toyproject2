"use client";

import Image from "next/image";
import styled from "styled-components";

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

const User = () => {
  return (
    <UserContainer>
      <Image src="/next.svg" alt="profile picture" width={70} height={70} />
      <UserName>최홍주</UserName>
    </UserContainer>
  );
};

export default User;
