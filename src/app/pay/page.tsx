"use client";
import styled from "styled-components";
import Card from "../../components/PayCard";
import {PayType} from "../../../type/Pay";
import PayDetail from "@/components/PayDetail";
import {useState} from "react";

const PayPageStyle = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    min-height: 100vh;
    gap: 10px;
`
const CardWrapper = styled.div`
    width: 830px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    flex-wrap: wrap;
`;


const mockData: PayType[] = [
    {
        id: "1",
        userId: "test@gmail.com",
        deductions: "30000",
        paymentDate: "2024-02-14",
        earnings: "20000",
        total: "10000"
    },
    {
        id: "2",
        userId: "test@gmail.com",
        deductions: "10000",
        paymentDate: "2024-03-14",
        earnings: "20000",
        total: "10000"
    },
    {
        id: "3",
        userId: "test@gmail.com",
        deductions: "10000",
        paymentDate: "2024-04-14",
        earnings: "20000",
        total: "10000"
    },
    {
        id: "4",
        userId: "test@gmail.com",
        deductions: "10000",
        paymentDate: "2024-05-14",
        earnings: "20000",
        total: "10000"
    },
    {
        id: "5",
        userId: "test@gmail.com",
        deductions: "10000",
        paymentDate: "2024-06-14",
        earnings: "20000",
        total: "10000"
    }
]
const reset = {
    deductions: "", earnings: "", id: "", paymentDate: "", total: "", userId: ""
}
const PayPage = () => {
    const [target ,setTarget] = useState<PayType>(reset);
    const settingTarget = (pay: PayType) => {
        setTarget(pay);
    }
    const resetTarget = () => {
        setTarget(reset);
    }
    return (
        <PayPageStyle>
            <CardWrapper>
                {
                    mockData.map((item) => {
                        return (
                            <Card key={item.id} pay={item}  setTarget={settingTarget}/>
                        )
                    })
                }
            </CardWrapper>
            <PayDetail pay={target} resetTarget={resetTarget}></PayDetail>
        </PayPageStyle>
    )
}
export default PayPage;