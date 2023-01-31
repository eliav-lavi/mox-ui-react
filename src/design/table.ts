import styled from "styled-components";
import { Color } from "./colors";

export const Table = styled.table<{ width?: string }>`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  max-width: 100%;
  width: ${props => props.width};
  box-shadow: 0 0 20px ${Color.Gray300};;
`;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr`
  border-bottom: 1px solid ${Color.Gray300};;
  background-color: ${Color.Gray100};;
  &:nth-of-type(even) {
    background-color: ${Color.Gray200};;
  }
  &:last-of-type {
    border-bottom: 2px solid ${Color.Gray300};
  }
`;
export const TableData = styled.td`
  font-family: monospace;
  padding: 12px 15px;
`;