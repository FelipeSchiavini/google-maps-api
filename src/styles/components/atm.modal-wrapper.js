import styled from "styled-components";

export const ModalWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 55%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 15px 15px 40px 15px;
  border: 1px solid black;
  z-index: 99;
  @media screen and (max-width: 48em) {
    width: 75%;
    height: 50%;
    padding: 15px 15px 40px 15px;
  }
`;

export default ModalWrapper;
