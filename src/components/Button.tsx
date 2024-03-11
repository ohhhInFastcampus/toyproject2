import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  Image?: string;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.variant === "secondary" ? "#555" : "#007bff"};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary" ? "#333" : "#0056b3"};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button = ({ variant = "primary", children, ...rest }: ButtonProps) => {
  return (
    <StyledButton {...rest} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
