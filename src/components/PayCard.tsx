import React from "react";
import styled from "styled-components";
import { PayType } from "../type/Pay";
import Button from "@/components/Button";

const CardContainer = styled.div`
  width: 200px;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h2`
  margin-bottom: 25px;
  text-align: center;
  font-size: 1.5rem; /* Larger font size for title */
  color: #333; /* Darker color for title */
  font-weight: bold;
`;

const CardDate = styled.p`
  color: #666;
  margin-bottom: 10px;
  font-size: 0.9rem; /* Smaller font size for date */
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const ContentLabel = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;

const ContentValue = styled.div`
  font-size: 1rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  &:hover {
    background-color: #e0e0e0;
    color: #222;
    border-color: #bbb;
  }
`;

interface CardProps {
  pay: PayType;
  setTarget: (pay: PayType) => void;
}

const Card = ({ pay, setTarget }: CardProps) => {
  const payMonth = new Date(pay.paymentDate).getMonth();

  const handleClick = () => {
    setTarget(pay);
  };

  return (
    <CardContainer>
      <div>
        <CardTitle>{payMonth + 1}월</CardTitle>
        <CardDate>{pay.paymentDate} 지급</CardDate>
      </div>
      <CardContent>
        <ContentLabel>지급총액:</ContentLabel>
        <ContentValue>{pay.total}</ContentValue>
      </CardContent>
      <CardContent>
        <ContentLabel>공제총액:</ContentLabel>
        <ContentValue>{pay.deductions}</ContentValue>
      </CardContent>
      <CardContent>
        <ContentLabel>기본급:</ContentLabel>
        <ContentValue>{pay.earnings}</ContentValue>
      </CardContent>
      <ButtonWrap>
        <StyledButton onClick={handleClick}>상세내역</StyledButton>
      </ButtonWrap>
    </CardContainer>
  );
};

export default Card;
