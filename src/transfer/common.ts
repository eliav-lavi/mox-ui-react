import styled from "styled-components";
import { FieldRow as GeneralFieldRow } from "../design/form-fields";

export const PanelMargins = styled.div`
  padding: 10px 20px;
  display: flex;
  width: 100%;
`;

export const FieldRow = styled(GeneralFieldRow)`
  overflow-y: scroll;
  margin-bottom: 10px;
`;

export const ControlsFieldRow = GeneralFieldRow;
