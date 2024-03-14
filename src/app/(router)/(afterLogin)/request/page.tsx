"use client";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import Correction from "./_component/correction";
import { RequestType } from "@/type/Request";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import * as S from "@/app/(router)/(afterLogin)/request/requestStyle";

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
    <S.Box>
      <S.ButtonContainer>
        <Button onClick={handleOpenModal}>정정 신청하기</Button>{" "}
      </S.ButtonContainer>
      <S.Title>
        <h2>정정 신청 내역</h2>
      </S.Title>
      {requestModal && (
        <S.ModalBackground onClick={handleCloseModal}>
          <S.ModalContainer onClick={(e) => e.stopPropagation()}>
            <S.CloseButtonContainer>
              <Button onClick={handleCloseModal}>
                <Image src="/xmark.svg" alt="닫기" width={25} height={25} />
              </Button>
            </S.CloseButtonContainer>
            <Correction />
          </S.ModalContainer>
        </S.ModalBackground>
      )}
      <S.Container>
        <S.Table>
          <S.TableHead>
            <tr>
              <S.TableHeaderCell>월</S.TableHeaderCell>
              <S.TableHeaderCell>결재자</S.TableHeaderCell>
              <S.TableHeaderCell>정정 사유</S.TableHeaderCell>
              <S.TableHeaderCell>요청사항</S.TableHeaderCell>
            </tr>
          </S.TableHead>
          <tbody>
            {submissions.map((submission, index) => (
              <S.TableRow key={index}>
                <S.TableCell>{submission.month}</S.TableCell>
                <S.TableCell>{submission.approver}</S.TableCell>
                <S.TableCell>{submission.reason}</S.TableCell>
                <S.TableCell>{submission.memo}</S.TableCell>
              </S.TableRow>
            ))}
          </tbody>
        </S.Table>
      </S.Container>
    </S.Box>
  );
};
export default RequestPage;
