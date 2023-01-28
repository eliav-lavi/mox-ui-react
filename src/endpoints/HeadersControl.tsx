import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { FieldItem, FieldRow } from "../design/form-fields";
import { HoverableCancelIcon } from "../design/HoverableCancelIcon";
import {
  defaultEndpointForm,
  HeaderForm,
  HeadersForm,
} from "../model/endpoint-form.model";

const RemoveHeaderDiv = styled.div<{ show: boolean }>`
  visibility: ${(props) => (props.show ? undefined : "hidden")};
`;

type IndexedHeaderForm = HeaderForm & { index: number };
type IndexedHeadersForm = Array<IndexedHeaderForm>;

function addIndexes(headersForm: HeadersForm): IndexedHeadersForm {
  return headersForm.map((header, index) => {
    return { ...header, index };
  });
}

export function HeadersControl(props: {
  headersData: HeadersForm;
  isUpdate: boolean;
  onChange: (headersForm: HeadersForm) => void;
}) {
  const { onChange } = props;
  const [data, setData] = useState<IndexedHeadersForm>([]);
  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    if (
      !!initDone ||
      (props.headersData === defaultEndpointForm.headers && props.isUpdate)
    ) {
      return;
    }
    setData(appendEmptyHeaderItem(addIndexes(props.headersData)));
    setInitDone(true);
  }, [props, initDone]);

  useEffect(() => {
    if (!initDone) {
      return;
    }
    onChange(data);
  }, [data, initDone]);

  function appendEmptyHeaderItem(data: IndexedHeadersForm): IndexedHeadersForm {
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

  function handleOnFocus(index: number) {
    return (_: React.FocusEvent<HTMLInputElement>) => {
      if (isLastHeaderForm(index)) {
        setData(appendEmptyHeaderItem(data));
      }
    };
  }

  function handleOnBlur(index: number) {
    return (_: React.FocusEvent<HTMLInputElement>) => {
      if (isEmptyHeaderForm(index)) {
        removeHeader(index);
      }
    };
  }

  function removeHeader(index: number) {
    setData(addIndexes(data.filter((header) => header.index !== index)));
  }

  function isEmptyHeaderForm(index: number): boolean {
    const { headerName, headerValue } = data[index];
    return !headerName && !headerValue;
  }

  function isLastHeaderForm(index: number): boolean {
    return index === data.length - 1;
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
              onFocus={handleOnFocus(header.index)}
              onBlur={handleOnBlur(header.index)}
            ></TextField>
          </FieldItem>
          <FieldItem flex={12}>
            <TextField
              fullWidth
              label="Header Value"
              value={header.headerValue}
              onChange={handleChangeValue(header.index, "headerValue")}
              onFocus={handleOnFocus(header.index)}
              onBlur={handleOnBlur(header.index)}
            ></TextField>
          </FieldItem>
          <FieldItem flex={0}>
            <RemoveHeaderDiv show={!isLastHeaderForm(header.index)}>
              <HoverableCancelIcon onClick={() => removeHeader(header.index)} />
            </RemoveHeaderDiv>
          </FieldItem>
        </FieldRow>
      ))}
    </>
  );
}
