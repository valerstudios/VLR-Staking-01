import styled from "styled-components";
import { Button } from "@mui/material";

export const StakingArea = styled.div`
  margin-bottom: 25px;
  display: flex;
  order: 2;
  flex-direction: column;
  background: #dc7260;
  border-radius: 25px;
  padding: 5%;
`;

export const StakerButton = styled(Button)`
    &&{
  background: #36454F;
  margin: 1em;
  order: 2}
`;

export const StakerInput = styled.input`
  width: 100%;
  padding: 1%;
  order: 1;
`;

export const MyBalance = styled.h3`
  width: 100%;
`;

export const PendingBox = styled.div`
display: flex;
order: 2;
flex-direction: column;
background: #dc7260;
border-radius: 25px;
padding: 5%;
margin-bottom: 25px;
`
