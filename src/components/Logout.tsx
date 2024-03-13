import theme from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 130%;
  left: 60%;
  transform: translateX(-50%);
  width: 100px;
`;

const LogoutButton = styled.button`
  position: relative;
  background-color: ${theme.colors.darkGray};
  color: white;
  border: none;
  border-radius: ${theme.border.radius};
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 700;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 65%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent ${theme.colors.darkGray} transparent;
  }
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
