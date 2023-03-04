import { Button, Checkbox } from "@mui/material";
import { useState } from "react";
import { Ellipsis } from "../design/CopyableTooltip";
import { FieldItem, Form } from "../design/form-fields";
import { Table, TableBody, TableData, TableRow } from "../design/table";
import { useAppSelector } from "../state/hooks";
import { FieldRow, PanelMargins } from "./common";

export function Export() {
  const allEndpoints = useAppSelector((state) => state.endpoints.endpoints);
  const allEndpointIds = new Set(allEndpoints.map((endpoint) => endpoint.id));
  const [selectedEndpointIds, setSelectedEndpoints] = useState<Set<number>>(
    new Set()
  );

  function toggleSelect(id: number) {
    return (_: React.ChangeEvent<HTMLInputElement>) => {
      let newSet = new Set(selectedEndpointIds);
      selectedEndpointIds.has(id) ? newSet.delete(id) : newSet.add(id);
      setSelectedEndpoints(newSet);
    };
  }

  function isAllSelected() {
    return (
      allEndpointIds.size === selectedEndpointIds.size &&
      new Set([...selectedEndpointIds, ...allEndpointIds]).size ===
        selectedEndpointIds.size
    );
  }

  function toggleSelectAll() {
    if (isAllSelected()) {
      setSelectedEndpoints(new Set());
    } else {
      setSelectedEndpoints(new Set(allEndpointIds));
    }
  }


  const handleExport: () => void = () => {
    const selectedEndpoints = allEndpoints.filter((endpoint) =>
      selectedEndpointIds.has(endpoint.id)
    );
    
    const fileData = JSON.stringify(selectedEndpoints, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "endpoints-schema.json";
    link.href = url;
    link.click();
    link.remove();
  };

  return (
    <>
      <PanelMargins>
        <Form style={{ width: "100%" }}>
          <FieldRow>
            {!allEndpoints.length ? (
              <div>No endpoints found.</div>
            ) : (
              <div>Please select the endpoints you would like to export.</div>
            )}
          </FieldRow>
          <FieldRow>
            {!!allEndpoints.length && (
              <Table width="100%">
                <TableBody>
                  {allEndpoints.map((endpoint) => {
                    return (
                      <TableRow key={endpoint.id}>
                        <TableData>
                          <Checkbox
                            id={endpoint.id.toString()}
                            checked={selectedEndpointIds.has(endpoint.id)}
                            size="small"
                            onChange={toggleSelect(endpoint.id)}
                          />
                        </TableData>
                        <TableData>
                          <code>{endpoint.verb}</code>
                        </TableData>
                        <TableData>
                          <code>{endpoint.path}</code>
                        </TableData>
                        <TableData>
                          <code>{endpoint.statusCode}</code>
                        </TableData>
                        <TableData>
                          <code>
                            <Ellipsis
                              content={endpoint.returnValue}
                              maxLength={40}
                            />
                          </code>
                        </TableData>
                        <TableData>
                          <code>
                            <Ellipsis
                              content={JSON.stringify(
                                endpoint.headers,
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
          <FieldRow justifyContent="end">
            {!!allEndpoints.length && (
              <>
                <FieldItem flex={"0 1 auto"}>
                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    onClick={toggleSelectAll}
                    style={{ marginRight: "10px" }}
                  >
                    {isAllSelected() ? "Unselect all" : "Select all"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    component="label"
                    onClick={handleExport}
                    disabled={!selectedEndpointIds.size}
                  >
                    Export {selectedEndpointIds.size} Endpoints
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
