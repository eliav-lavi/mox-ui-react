import styled from "styled-components";
import {
  FieldItem,
  FieldRow as GeneralFieldRow,
  Form,
} from "../design/form-fields";

export const PanelMargins = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;
`;

export const FieldRow = styled(GeneralFieldRow)`
  overflow-y: scroll;
  margin-bottom: 10px;
`;
