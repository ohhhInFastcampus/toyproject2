"use client";
import React, {useState} from 'react';
import LoginForm from '../../components/LoginForm';
import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`
const LoginPage = () => {
    const [error, setError] = useState("");
    const login = () => {
        //TODO login 시 firebase 통신
        // error 가 반환될 시 catch error
    }
    return (
        <StyledContainer>
            <LoginForm loginFn={login} error={error}/>
        </StyledContainer>
    );
};

export default LoginPage;