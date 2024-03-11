// "next/image"를 한 번만 임포트합니다.
import Image from "next/image";
import styled from "styled-components";
import { UserType } from "../type/UserType";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

interface UserProps extends UserType {
  onClick: () => void;
}

const User = ({ onClick, name, profile }: UserProps) => {
  const [clientPhotoURL, setClientPhotoURL] = useState<string | null>(null);
  const photoURL = useSelector((state: RootState) => state.auth.photoURL);

  useEffect(() => {
    setClientPhotoURL(photoURL);
  }, [photoURL]);

  return (
    <UserContainer onClick={onClick}>
      {clientPhotoURL && (
        <Image
          src={clientPhotoURL}
          alt="user profile"
          width={500}
          height={300}
        />
      )}
      <UserName>{name}</UserName>
    </UserContainer>
  );
};

export default User;
