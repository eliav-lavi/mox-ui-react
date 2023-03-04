import styled from "styled-components";

import { ChangeEvent, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { Endpoint } from "../model/endpoint.model";
import { Table, TableBody, TableData, TableRow } from "../design/table";
import { Ellipsis } from "../design/CopyableTooltip";
import camelcaseKeys from "camelcase-keys";
import {
  FieldItem,
  FieldRow as GeneralFieldRow,
  Form,
} from "../design/form-fields";
import { useAppDispatch } from "../state/hooks";
import { submitCreateEndpointAsync } from "../state/endpointsSlice";
import { useNavigate } from "react-router-dom";

function FileUploadSingle(props: {
  setFile: (s: string) => void;
  color: "primary" | "secondary";
}) {
  const handleUploadClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (!result) {
          return;
        }
        props.setFile(result.toString());
        return;
      };
    }
  };

  return (
    <div>
      <Button variant="outlined" color={props.color} component="label">
        Upload
        <input type="file" onChange={handleUploadClick} hidden />
      </Button>
    </div>
  );
}

const PanelMargins = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;
`;

const FieldRow = styled(GeneralFieldRow)`
  overflow-y: scroll;
  margin-bottom: 10px;
`;

interface ImportedEndpoint {
  endpoint: Endpoint;
  id: string;
  checked: boolean;
}

export function Import() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [importedEndpoints, setImportedEndpoints] = useState<
    Array<ImportedEndpoint>
  >([]);

  const handleApply: () => void = () => {
    importedEndpoints.forEach((importedEndpoint) => {
      if (!importedEndpoint.checked) {
        return;
      }
      dispatch(
        submitCreateEndpointAsync({ endpoint: importedEndpoint.endpoint })
      );
      navigate("/endpoints")
    });
  };

  function parseFile(s: string) {
    const parsed = camelcaseKeys(JSON.parse(s), {
      deep: false,
    }) as Array<Endpoint>;
    const importedEndpoints: Array<ImportedEndpoint> = parsed.map(
      (endpoint, i) => {
        return { endpoint, id: i.toString(), checked: false, conflicts: false };
      }
    );
    setImportedEndpoints(importedEndpoints);
  }

  function clearUpload() {
    setImportedEndpoints([]);
  }

  function toggleSelectAll() {
    const nextState = getSelectAllState();
    setImportedEndpoints(
      importedEndpoints.map((importedEndpoint) => {
        return { ...importedEndpoint, checked: nextState };
      })
    );
  }

  function getSelectAllState(): boolean {
    if (importedEndpoints.map((ie) => ie.checked).every((c) => !!c)) {
      return false;
    }
    return true;
  }

  function toggleSelect(id: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setImportedEndpoints(
        importedEndpoints.map((importedEndpoint) => {
          if (importedEndpoint.id !== id) {
            return importedEndpoint;
          }
          return { ...importedEndpoint, checked: !importedEndpoint.checked };
        })
      );
    };
  }

  const selectedCount = importedEndpoints.filter(endpoint => endpoint.checked).length

  return (
    <>
      <PanelMargins>
        <Form style={{ width: "100%" }}>
          <FieldRow>
            {!importedEndpoints.length ? (
              <div>
                Please upload an exported <code>mox</code> JSON to begin.
              </div>
            ) : (
              <div>Please select the endpoints you would like to import.</div>
            )}
          </FieldRow>
          <FieldRow>
            {!!importedEndpoints.length && (
              <Table width="100%">
                <TableBody>
                  {importedEndpoints.map((importedEndpoint) => {
                    return (
                      <TableRow key={importedEndpoint.id}>
                        <TableData>
                          <Checkbox
                            id={importedEndpoint.id}
                            checked={importedEndpoint.checked}
                            size="small"
                            onChange={toggleSelect(importedEndpoint.id)}
                          />
                        </TableData>
                        <TableData>
                          <code>{importedEndpoint.endpoint.verb}</code>
                        </TableData>
                        <TableData>
                          <code>{importedEndpoint.endpoint.path}</code>
                        </TableData>
                        <TableData>
                          <code>{importedEndpoint.endpoint.statusCode}</code>
                        </TableData>
                        <TableData>
                          <code>
                            <Ellipsis
                              content={importedEndpoint.endpoint.returnValue}
                              maxLength={40}
                            />
                          </code>
                        </TableData>
                        <TableData>
                          <code>
                            <Ellipsis
                              content={JSON.stringify(
                                importedEndpoint.endpoint.headers,
                                null,
                                2
                              )}
                              maxLength={40}
                            />
                          </code>
                        </TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </FieldRow>
          <FieldRow justifyContent="space-between">
            <FieldItem flex={0}>
              {!importedEndpoints.length ? (
                <>
                  <FileUploadSingle setFile={parseFile} color="primary" />
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={clearUpload}
                  >
                    Clear
                  </Button>
                </>
              )}
            </FieldItem>
            {!!importedEndpoints.length && (
              <>
                <FieldItem flex={"0 1 auto"}>
                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    onClick={toggleSelectAll}
                    style={{ marginRight: "10px" }}
                  >
                    {getSelectAllState() ? "Select all" : "Unselect all"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    onClick={handleApply}
                    disabled={!selectedCount}
                  >
                    Import {selectedCount} Endpoints
                  </Button>
                </FieldItem>
              </>
            )}
          </FieldRow>
        </Form>
      </PanelMargins>
    </>
  );
}
