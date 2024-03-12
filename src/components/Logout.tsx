import theme from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  background-color: ${theme.colors.lightGrey};
  color: white;
  border-radius: ${theme.border.radius};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const LogoutButton = styled.button`
  background-color: ${theme.colors.darkGray};
  color: white;
  border: none;
  border-radius: ${theme.border.radius};
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.7rem;
`;
interface LogoutProps {
  onLogout: () => void;
}

export const Logout = ({ onLogout }: LogoutProps) => {
  return (
    <PopupContainer>
      <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
    </PopupContainer>
  );
};
