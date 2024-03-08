import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'primary' | 'secondary';
}

const StyledInput = styled.input<InputProps>`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.variant === 'secondary' ? '#555' : '#ccc'};
  background-color: ${props => props.variant === 'secondary' ? '#f4f4f4' : 'transparent'};
  color: ${props => props.variant === 'secondary' ? '#333' : 'inherit'};
  transition: border-color 0.3s ease;

  &:hover,
  &:focus {
    border-color: ${props => props.variant === 'secondary' ? '#333' : '#007bff'};
  }
`;

const Input = ({ variant = 'primary', ...rest }: InputProps) => {
    return <StyledInput variant={variant} {...rest} />;
};

export default Input;
