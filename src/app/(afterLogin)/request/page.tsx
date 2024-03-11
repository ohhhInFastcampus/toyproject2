"use client";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import Correction from "./_component/correction";
import styled from "styled-components";
import { RequestType } from "@/type/Request";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

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
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
`;

const StyledTable = styled.table`
  width: 80%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

// 테이블 헤더 스타일
const StyledThead = styled.thead`
  background-color: #1f1f1f;
  color: white;
  border-radius: 10px;
`;

// 테이블 행 스타일
const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

// 테이블 헤더 셀 스타일
const StyledTh = styled.th`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

// 테이블 데이터 셀 스타일
const StyledTd = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const RequestPage = () => {
  const [requestModal, setRequestModal] = useState(false);
  const [submissions, setSubmissions] = useState<RequestType[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const submissionsData = querySnapshot.docs.map(
        (doc) => doc.data() as RequestType
      );
      setSubmissions(submissionsData);
    };

    fetchSubmissions();
  }, []);

  const handleOpenModal = () => {
    setRequestModal(true);
  };

  const handleCloseModal = () => {
    setRequestModal(false);
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>정정 신청하기</Button>
      <h2>정정 신청 내역</h2>
      {requestModal && (
        <ModalBackground onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Correction />
            <Button onClick={handleCloseModal}>닫기</Button>
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
    </div>
  );
};
export default RequestPage;
