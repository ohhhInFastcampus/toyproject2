"use client";
import Button from "@/components/Button";
import { useState } from "react";
import Correction from "./_component/correction";
import styled from "styled-components";
import { RequestType } from "@/type/Request";

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

const RequestPage = () => {
  const [requestModal, setRequestModal] = useState(false);
  const [submissions, setSubmissions] = useState<RequestType[]>([]);

  const handleOpenModal = () => {
    setRequestModal(true);
  };

  const handleCloseModal = () => {
    setRequestModal(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={handleOpenModal}>정정 신청하기</Button>
      {requestModal && (
        <ModalBackground onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Correction />
            <Button onClick={handleCloseModal}>닫기</Button>
          </ModalContainer>
        </ModalBackground>
      )}
      <table>
        <thead>
          <tr>
            <th>월</th>
            <th>결재자</th>
            <th>정정 사유</th>
            <th>요청사항</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index: number) => (
            <tr key={index}>
              <td>{submission.month}</td>
              <td>{submission.approver}</td>
              <td>{submission.reason}</td>
              <td>{submission.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RequestPage;
