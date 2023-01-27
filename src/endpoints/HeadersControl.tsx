import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldItem, FieldRow } from "../design/form-fields";
import { HoverableCancelIcon } from "../design/HoverableCancelIcon";
import {
  defaultEndpointForm,
  HeaderForm,
  HeadersForm,
} from "../model/endpoint-form.model";

export function HeadersControl(props: {
  headersData: HeadersForm;
  isUpdate: boolean;
  onChange: (headersForm: HeadersForm) => void;
}) {
  const { onChange } = props;
  const [data, setData] = useState<HeadersForm>(props.headersData);
  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    if (
      !!initDone ||
      (props.headersData === defaultEndpointForm.headers && props.isUpdate)
    ) {
      return;
    }
    setData(appendEmptyHeaderItem(props.headersData));
    setInitDone(true);
  }, [props, initDone]);

  useEffect(() => {
    if (!initDone) {
      return;
    }
    onChange(data);
  }, [data, initDone]);

  function appendEmptyHeaderItem(data: HeadersForm): HeadersForm {
    return [...data, { index: data.length, headerName: "", headerValue: "" }];
  }

  function handleChangeValue(index: number, key: keyof HeaderForm) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setData(
        data.map((header) => {
          if (header.index === index) {
            return { ...header, [key]: event.target.value };
          } else {
            return header;
          }
        })
      );
    };
  }

  function removeHeader(index: number) {
    setData(data.filter((header) => header.index !== index));
  }

  return (
    <>
      {data.map((header) => (
        <FieldRow key={header.index} justifyContent="space-between">
          <FieldItem flex={12}>
            <TextField
              fullWidth
              label="Header Name"
              value={header.headerName}
              onChange={handleChangeValue(header.index, "headerName")}
            ></TextField>
          </FieldItem>
          <FieldItem flex={12}>
            <TextField
              fullWidth
              label="Header Value"
              value={header.headerValue}
              onChange={handleChangeValue(header.index, "headerValue")}
            ></TextField>
          </FieldItem>
          <FieldItem flex={0}>
            {header.index}/{data.length-1}
            {/* How can this be done using styled-components? */}
            <div
              style={
                header.index === data.length - 1 ? { visibility: "hidden" } : {}
              }
            >
              <HoverableCancelIcon onClick={() => removeHeader(header.index)} />
            </div>
          </FieldItem>
        </FieldRow>
      ))}
    </>
  );
}
