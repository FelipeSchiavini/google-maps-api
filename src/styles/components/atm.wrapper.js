import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justfy-content: space-around;
  width: 35%;
  height: 60%;
  background-color: rgba(0, 0, 0, 0.6);
  margin: auto;
  border-radius: 5px;
  padding: 15px 15px 40px 15px;
  border: 1px solid black;
  z-index: 99;
  @media screen and (max-width: 48em) {
    width: 75%;
    height: 70%;
    padding: 15px 15px 40px 15px;
  }
`;

export default Wrapper;
