"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import { RefObject } from "@fullcalendar/core/preact.js";

const LoginFormContainer = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
const ErrorStyle = styled.div`
  position: absolute;
  color: red;
  bottom: 100px;
`;

interface LoginFormProps {
  error: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  formRef: RefObject<HTMLFormElement>;
}

const LoginForm = ({ error, onSubmit, formRef }: LoginFormProps) => {
  return (
    <LoginFormContainer>
      <Form onSubmit={onSubmit} ref={formRef}>
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Button>Login</Button>
      </Form>
      <ErrorStyle>{error}</ErrorStyle>
    </LoginFormContainer>
  );
};

export default LoginForm;
