import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid #afafaf;
  width: 500px;
  align-items: center;
`;

export const Divider = styled.div`
  height: 2px;
  background-color: var(--gray);
  width: 100%;
`;

export const Title = styled.h3`
  font-weight: bold;
`;

export const ImageContainer = styled.img`
  width: 400px;
  height: 400px;
  border: 1px solid var(--gray);
`;

export const Space = styled.div<{ height?: number }>`
  height: ${(props) => (props.height ? props.height + "px" : "20px")};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 130px;
  height: 33px;
  justify-content: space-between;
`;

export const SelectButton = styled.div`
  border: 1px solid var(--green-dark);
  border-radius: 4px;
  background-color: var(--green-light);
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33px;
  &:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input.attrs({
  type: "file",
})`
  display: none;
`;

export const UploadButton = styled.div`
  border: 1px solid var(--blue-dark);
  border-radius: 4px;
  background-color: var(--blue-light);
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33px;
  &:hover {
    cursor: pointer;
  }
`;
