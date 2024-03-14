import styled from "styled-components";
import theme from "@/styles/theme";

export const Box = styled.div`
  background-color: ${theme.colors.white};
  padding-top: 1em;
  padding-bottom: 5em;
  border-radius: ${theme.border.radius};
`;

export const ModalBackground = styled.div`
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
export const CloseButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;
export const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10rem;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
`;

export const Table = styled.table`
  width: 80%;
  margin-top: 2rem;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: ${theme.border.radius};
`;

// 테이블 헤더 스타일
export const TableHead = styled.thead`
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
export const TableRow = styled.tr`
  &:last-child td:first-child {
    border-bottom-left-radius: ${theme.border.radius};
  }
  &:last-child td:last-child {
    border-bottom-right-radius: ${theme.border.radius};
  }
`;

// 테이블 헤더 셀 스타일
export const TableHeaderCell = styled.th`
  padding: 1rem 1.1rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

// 테이블 데이터 셀 스타일
export const TableCell = styled.td`
  padding: 1rem 1.1rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;
