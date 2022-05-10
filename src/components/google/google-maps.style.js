import styled from "styled-components";
import Button from "@mui/material/Button";

export const AutocompleteGoogle = styled(Button)`
  @media screen and (max-width: 48em) {
    margin: 0;
  }
`;

export const AutoCompleteInput = styled.input`
  height: 25px;
  border-radius: 4px;
  width: 350px;
  padding: 5px 20px;
  border: 0;
  @media screen and (max-width: 70em) {
    width: 100%;
  }
  @media screen and (max-width: 48em) {
    top: 10px;
    margin: 0;
    padding: 5px 10px;
  }
`;
export const SearchBarWrapper = styled.div`
  margin: auto;
  background-color: rgba(66, 165, 245, 0.8);
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-around;
  border-radius: 4px;
  height: 5em;
  @media screen and (max-width: 70em) {
    width: 60%;
  }

  @media screen and (max-width: 48em) {
    width: 70%;
    top: 10px;
    justify-content: center;
    flex-direction: column;
    height: 18%;
    gap: 10px;
  }
`;
