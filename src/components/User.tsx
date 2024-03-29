// "next/image"를 한 번만 임포트합니다.
import Image from "next/image";
import styled from "styled-components";
import { UserType } from "../type/UserType";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import theme from "@/styles/theme";

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  border-radius: 100%;
  gap: 1rem;
  padding: 5px;
`;
const User = () => {
  const [clientPhotoURL, setClientPhotoURL] = useState<string | null>(null);
  const photoURL = useSelector((state: RootState) => state.auth.photoURL);

  useEffect(() => {
    // FIXME: `photoURL`이 "null"인 경우가 있음
    if (photoURL && photoURL !== "null") {
      setClientPhotoURL(photoURL);
    }
  }, [photoURL]);

  return (
    <UserContainer>
      <Image
        src={clientPhotoURL ?? "/xmark.svg"}
        alt="user profile"
        width={25}
        height={25}
      />
    </UserContainer>
  );
};
export default User;
