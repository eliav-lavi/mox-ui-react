import SettingsEthernetOutlinedIcon from "@mui/icons-material/SettingsEthernetOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FieldItem, FieldRow, Form } from "../design/form-fields";
import {
  defaultEndpointForm,
  EndpointForm,
  HeadersForm,
} from "../model/endpoint-form.model";
import { PersistedEndpoint } from "../model/endpoint.model";
import { transformToForm } from "../services/form-transformations";
import {
  editEndpoint,
  submitDeleteEndpointAsync,
} from "../state/endpointsSlice";
import { useAppDispatch } from "../state/hooks";
import styled from "styled-components";
import { Ellipsis } from "../design/CopyableTooltip";

export function ShowEndpoint(props: { persistedEndpoint: PersistedEndpoint }) {
  const dispatch = useAppDispatch();
  const [endpointData, setEndpointData] =
    useState<EndpointForm>(defaultEndpointForm);

  const { persistedEndpoint } = props;

  const handleEdit: () => void = () =>
    dispatch(editEndpoint(persistedEndpoint.id));
  const handleDelete: () => void = () =>
    dispatch(submitDeleteEndpointAsync({ id: persistedEndpoint.id }));

  useEffect(() => {
    setEndpointData(transformToForm(persistedEndpoint));
  }, [persistedEndpoint]);

  return (
    <Form>
      <div>
        <FieldRow>
          <Typography variant="h5" style={{ fontFamily: "monospace" }}>
            {endpointData.main.verb} {endpointData.main.path}
          </Typography>
        </FieldRow>
        <FieldRow>
          <Typography variant="h6" style={{ fontFamily: "monospace" }}>
            {endpointData.main.statusCode}
          </Typography>
        </FieldRow>
        <FieldRow>
          <FieldItem flex={1}>
            <Typography
              variant="body2"
              style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
            >
              {endpointData.main.returnValue}
            </Typography>
          </FieldItem>
        </FieldRow>
        <FieldRow>
          <FieldItem flex={1}>
            <HeadersTable headers={endpointData.headers} />
          </FieldItem>
        </FieldRow>

        {endpointData.sleepTime.sleepType === "fixed" && (
          <FieldRow justifyContent="start">
            <FieldItem flex={0}>
              <TimerOutlinedIcon />
            </FieldItem>
            <FieldItem flex={0}>
              <Typography variant="body1" style={{ fontFamily: "monospace" }}>
                {endpointData.sleepTime.min}ms
              </Typography>
            </FieldItem>
          </FieldRow>
        )}
        {endpointData.sleepTime.sleepType === "range" && (
          <FieldRow>
            <FieldItem flex={0}>
              <SettingsEthernetOutlinedIcon />
            </FieldItem>
            <FieldItem flex={1}>
              <Typography variant="body1" style={{ fontFamily: "monospace" }}>
                {endpointData.sleepTime.min}ms - {endpointData.sleepTime.max}ms
              </Typography>
            </FieldItem>
          </FieldRow>
        )}
      </div>
      <div>
        <FieldRow justifyContent="end">
          <FieldItem flex={0}>
            <Button variant="outlined" color="warning" onClick={handleDelete}>
              Delete
            </Button>
          </FieldItem>
          <FieldItem flex={0}>
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              Edit
            </Button>
          </FieldItem>
        </FieldRow>
      </div>
    </Form>
  );
}

const HeadersTableTable = styled.table``;
const HeadersTableHead = styled.thead``;
const HeadersTableBody = styled.tbody``;
const HeadersTableHeader = styled.th`
  text-align: left;
`;
const HeadersTableRow = styled.tr``;
const HeadersTableData = styled.td`
  font-family: monospace;
`;

function HeadersTable(props: { headers: HeadersForm }) {
  const { headers } = props;
  if (!headers.length) {
    return <></>;
  }
  return (
    <HeadersTableTable>
      <HeadersTableHead>
        <HeadersTableRow>
          <HeadersTableHeader>Header Name</HeadersTableHeader>
          <HeadersTableHeader>Header Value</HeadersTableHeader>
        </HeadersTableRow>
      </HeadersTableHead>
      <HeadersTableBody>
        {headers.map((row) => (
          <HeadersTableRow key={row.index}>
            <HeadersTableData>{row.headerName}</HeadersTableData>
            <HeadersTableData>
              <Ellipsis content={row.headerValue} maxLength={10} />
            </HeadersTableData>
          </HeadersTableRow>
        ))}
      </HeadersTableBody>
    </HeadersTableTable>
  );
}
