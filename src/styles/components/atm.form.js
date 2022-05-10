import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  width: 65%;
  justfy-content: space-around;
  gap: 20px;
  flex-direction: column;
  margin: auto;
  @media screen and (max-width: 48em) {
    width: 85%;
  }
`;

export default Form;
