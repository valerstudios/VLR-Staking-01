import styled from "styled-components";
import { Card, CardContent } from "@mui/material";

export const MainArea = styled.div`
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  justify-content: flex-start;
  font-family: "Lato", Calibri, Arial, sans-serif;
  background: #7694ab;
  width: 35vw;
  padding: 5%;

`;

export const Title = styled.h1`
width: 100%;
color: black;
`

export const StatLine = styled.h3`
width: 100%;
`

export const MyCardContent = styled(CardContent)`
  background: #7694ab;
  border-radius: 25px;
`;

