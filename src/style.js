import styled from "styled-components";
import StakingBox from "./components/StakingBox/index.js";
import StakingStats from "./components/StakingStats/index.js";

export const MainArea = styled.div`
  background: #6b6d6c;
  width: 100%;
  min-height: 450px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const StakingArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StakingInputs = styled.div`
  order: 2;
`;
export const StakingNumbers = styled.div`
  order: 1;
  margin: 5%;
  width: 40vw;
`;
