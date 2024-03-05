import React from 'react';
import styled from 'styled-components';
import {PayType} from "../../type/Pay";
import Button from "@/components/Button";

const CardContainer = styled.div`
    width: 200px;
    height: 300px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
    margin-bottom: 15px;
    text-align: center;
`;
const CardDate = styled.p`
    color: #666;
    margin-bottom: 10px;
`
const CardContent = styled.p`
    display: flex;
    justify-content: start;
    text-align: start;
    align-items: center;
    gap: 20px;
    margin-bottom: 5px;
`;

interface CardProps {
    pay: PayType,
    setTarget : (pay : PayType) => void
}

const Card = ({pay, setTarget}: CardProps) => {
    const payMonth = new Date(pay.paymentDate).getMonth();
    return (
        <CardContainer>
            <CardTitle>{payMonth+1}월</CardTitle>
            <CardDate>
                {pay.paymentDate} 지급
            </CardDate>
            <CardContent>
                <div>지급총액</div>
                <div>{pay.total}</div>
            </CardContent>
            <CardContent>
                <div>공제총액</div>
                <div>{pay.deductions}</div>
            </CardContent>
            <CardContent>
                <div>지급총액</div>
                <div>{pay.earnings}</div>
            </CardContent>
            <Button onClick={()=>{setTarget(pay)}}>상세내역</Button>
        </CardContainer>
    );
};

export default Card;
