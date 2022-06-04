import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldItem, FieldRow } from "../design/form-fields";
import { defaultEndpointForm2, MainForm } from "../model/endpoint-form.model";


const verbs = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export function MainControl(props: { mainData: MainForm, onChange: (mainForm: MainForm) => void }) {
  const { onChange } = props
  const [data, setData] = useState<MainForm>(props.mainData)
  const [initDone, setInitDone] = useState(false)

  useEffect(() => {
    if (!!initDone || props.mainData === defaultEndpointForm2.main) {
      return
    }
    setData(props.mainData)
    setInitDone(true)
  }, [props, initDone])

  useEffect(() => {
    if (!initDone) {
      return
    }
    onChange(data)
  }, [data, initDone])

  function handleChangeValue(key: keyof MainForm) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [key]: event.target.value });
    }
  };

  return (
    <>
      <FieldRow>
        <FieldItem flex={3}>
          <TextField fullWidth select label="Verb" defaultValue={'GET'} value={data.verb} onChange={handleChangeValue('verb')}>
            {verbs.map(verb => <MenuItem key={verb} value={verb}>{verb}</MenuItem>)}
          </TextField>
        </FieldItem>
        <FieldItem flex={15}>
          <TextField fullWidth label="Path" value={data.path} onChange={handleChangeValue('path')}></TextField>
        </FieldItem>
        <FieldItem flex={3}>
          <TextField fullWidth label="Status Code" value={data.statusCode} onChange={handleChangeValue('statusCode')}></TextField>
        </FieldItem>
      </FieldRow>
      <FieldRow>
        <TextField
          multiline
          fullWidth
          minRows={8}
          maxRows={10}
          label="Return Value"
          value={data.returnValue}
          inputProps={{ style: { fontFamily: 'monospace' } }}
          onChange={handleChangeValue('returnValue')}></TextField>
      </FieldRow>
    </>
  )
}