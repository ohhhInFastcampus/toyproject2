"use client";
import styled from "styled-components";
import Card from "@/components/PayCard";
import { PayType } from "@/type/Pay";
import PayDetail from "@/components/PayDetail";
import { useState } from "react";
import theme from "@/styles/theme";

const PayPageStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.colors.white};
  border-radius: ${theme.border.radius};
  margin-left: auto; /* Center horizontally */
  margin-right: 100px; /* Center horizontally */
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  width: 100%; 
  max-width: 1200px; 
  display: flex;
  align-items: center;
  justify-content: space-between; 
  gap: 20px; 
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 0px;
`;

const mockData: PayType[] = [
  {
    id: "1",
    userId: "test@gmail.com",
    deductions: "30000",
    paymentDate: "2024-02-14",
    earnings: "20000",
    total: "10000",
  },
  {
    id: "2",
    userId: "test@gmail.com",
    deductions: "10000",
    paymentDate: "2024-03-14",
    earnings: "20000",
    total: "10000",
  },
  {
    id: "3",
    userId: "test@gmail.com",
    deductions: "10000",
    paymentDate: "2024-04-14",
    earnings: "20000",
    total: "10000",
  },
  {
    id: "4",
    userId: "test@gmail.com",
    deductions: "10000",
    paymentDate: "2024-05-14",
    earnings: "20000",
    total: "10000",
  },
  {
    id: "5",
    userId: "test@gmail.com",
    deductions: "10000",
    paymentDate: "2024-06-14",
    earnings: "20000",
    total: "10000",
  },
];

const reset = {
  deductions: "",
  earnings: "",
  id: "",
  paymentDate: "",
  total: "",
  userId: "",
};

const PayPage = () => {
  const [target, setTarget] = useState<PayType>(reset);

  const settingTarget = (pay: PayType) => {
    setTarget(pay);
  };

  const resetTarget = () => {
    setTarget(reset);
  };

  return (
    <PayPageStyle>
      <Title>
        <h2>급여내역</h2>
      </Title>
      <CardWrapper>
        {mockData.map((item) => {
          return <Card key={item.id} pay={item} setTarget={settingTarget} />;
        })}
      </CardWrapper>
      <PayDetail pay={target} resetTarget={resetTarget}></PayDetail>
    </PayPageStyle>
  );
};

export default PayPage;
