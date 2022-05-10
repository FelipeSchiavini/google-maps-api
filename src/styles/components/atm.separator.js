import styled from "styled-components";

const Separator = styled.br`
  margin: 20px 0;
  border: ${(props) => props.border ?? "1px solid black"};
`;

export default Separator;
