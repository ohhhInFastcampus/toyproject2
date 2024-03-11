import { PayType } from "../type/Pay";
import Button from "@/components/Button";
import styled from "styled-components";

interface PayDetailProps {
  pay: PayType;
  resetTarget: () => void;
}

const NonDetail = styled.div`
  width: 200px;
  height: 100%;
`;
const PayDetailStyle = styled.div`
  width: 250px;
  height: 100%;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  flex: 0 1 auto;
`;
const TitleStyle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
const ContentStyle = styled.div`
  border-bottom: 1px solid #ddd;
  padding-top: 10px;
  padding-bottom: 5px;
`;
const ButtonWrap = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const DeleteButton = styled.button`
  width: 100%;
  border: 1px solid black;
  padding: 10px 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: black;
    color: white;
  }
`;
const PayDetail = ({ pay, resetTarget }: PayDetailProps) => {
  return pay.id === "" ? (
    <NonDetail></NonDetail>
  ) : (
    <PayDetailStyle>
      <TitleStyle>{pay.paymentDate} 급여내역 합계</TitleStyle>
      <ContentStyle>기본급 {pay.earnings} 원</ContentStyle>
      <ContentStyle>지급총액 {pay.total}원</ContentStyle>
      <ButtonWrap>
        <DeleteButton
          onClick={() => {
            resetTarget();
          }}>
          닫기
        </DeleteButton>
      </ButtonWrap>
    </PayDetailStyle>
  );
};

export default PayDetail;
