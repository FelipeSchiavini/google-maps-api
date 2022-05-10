import styled, { keyframes } from "styled-components";
import image from "../../images/satellite.jpg";

const backgroundAnimation = keyframes`
  0%   {background-size:  150%, 25%, 25%; background-position: 0% 0%;}
  25%  {background-size:  150%, 25%, 25%; background-position: 100% 0%;}
  50%  {background-size:  120%, 25%, 25%; background-position: 100% 100%;}
  75%  {background-size:  120%, 25%, 25%; background-position: 0% 100%;}
  100% {background-size:  150%, 25%, 25%; background-position: 0% 0%;}
`;

export const Background = styled.div`
  display: flex;
  z-index: 1;
  justfy-content: center;
  height: 100vh;
  width: 100%;
  animation: ${backgroundAnimation} 200s linear infinite;
  background-image: url(${image});
`;

export default Background;
