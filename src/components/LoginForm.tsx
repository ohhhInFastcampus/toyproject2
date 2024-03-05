"use client";
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Button from "./Button";
import Input from "./Input";

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

const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;
const ErrorStyle = styled.div`
    position: absolute;
    color: red;
    bottom: 100px;
`

interface LoginFormProps {
    loginFn: () => void,
    error: string
}

const LoginForm = ({loginFn, error}: LoginFormProps) => {


    return (
        <LoginFormContainer>
            <Form>
                <Input type="text" placeholder="ID"/>
                <Input type="password" placeholder="Password"/>
                <Button onClick={loginFn}>Login</Button>
            </Form>
            <ErrorStyle>{error}</ErrorStyle>
        </LoginFormContainer>
    );
};

export default LoginForm;
