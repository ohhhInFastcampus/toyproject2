"use client";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import Correction from "./_component/correction";
import styled from "styled-components";
import { RequestType } from "@/type/Request";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import theme from "@/styles/theme";

const Box = styled.div`
  background-color: ${theme.colors.white};
  padding-top: 1em;
  padding-bottom: 5em;
  border-radius: ${theme.border.radius};
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const CloseButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;
const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
`;

const StyledTable = styled.table`
  width: 80%;
  margin-top: 2rem;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: ${theme.border.radius};
`;

// 테이블 헤더 스타일
const StyledThead = styled.thead`
  background-color: ${theme.colors.darkGray};
  color: white;
  text-align: center;

  & tr:first-child th:first-child {
    border-top-left-radius: ${theme.border.radius};
  }

  & tr:first-child th:last-child {
    border-top-right-radius: ${theme.border.radius};
  }
`;

// 테이블 행 스타일
const StyledTr = styled.tr`
  &:last-child td:first-child {
    border-bottom-left-radius: ${theme.border.radius};
  }
  &:last-child td:last-child {
    border-bottom-right-radius: ${theme.border.radius};
  }
`;

// 테이블 헤더 셀 스타일
const StyledTh = styled.th`
  padding: 1rem 1.1rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

// 테이블 데이터 셀 스타일
const StyledTd = styled.td`
  padding: 1rem 1.1rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const RequestPage = () => {
  const [requestModal, setRequestModal] = useState(false);
  const [submissions, setSubmissions] = useState<RequestType[]>([]);

  useEffect(() => {
    const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const submissionsData = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as RequestType)
      );
      setSubmissions(submissionsData);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenModal = () => {
    setRequestModal(true);
  };

  const handleCloseModal = () => {
    setRequestModal(false);
  };

  return (
    <Box>
      <ButtonContainer>
        <Button onClick={handleOpenModal}>정정 신청하기</Button>{" "}
      </ButtonContainer>
      <Title>
        <h2>정정 신청 내역</h2>
      </Title>
      {requestModal && (
        <ModalBackground onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButtonContainer>
              <Button onClick={handleCloseModal}>
                <Image src="/xmark.svg" alt="닫기" width={25} height={25} />
              </Button>
            </CloseButtonContainer>
            <Correction />
          </ModalContainer>
        </ModalBackground>
      )}
      <Container>
        <StyledTable>
          <StyledThead>
            <tr>
              <StyledTh>월</StyledTh>
              <StyledTh>결재자</StyledTh>
              <StyledTh>정정 사유</StyledTh>
              <StyledTh>요청사항</StyledTh>
            </tr>
          </StyledThead>
          <tbody>
            {submissions.map((submission, index) => (
              <StyledTr key={index}>
                <StyledTd>{submission.month}</StyledTd>
                <StyledTd>{submission.approver}</StyledTd>
                <StyledTd>{submission.reason}</StyledTd>
                <StyledTd>{submission.memo}</StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </Container>
    </Box>
  );
};
export default RequestPage;
