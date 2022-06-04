import { Button, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FieldItem, FieldRow } from "../design/form-fields"
import { defaultEndpointForm, EndpointForm } from "../model/endpoint-form.model"
import { Endpoint, PersistedEndpoint } from "../model/endpoint.model"
import { transformToEndpoint, transformToForm } from "../services/form-transformations"
import { showEndpoint, submitCreateEndpointAsync, submitUpdateEndpointAsync } from "../state/endpointsSlice"
import { useAppDispatch } from "../state/hooks"
import { SleepTime, SleepTimeControl, SleepTimeData, SleepType } from "./SleepTimeControl"


const verbs = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between ;
  height: 100%;
`

export function UpsertEndpoint(props: { persistedEndpoint?: PersistedEndpoint }) {
  const dispatch = useAppDispatch()
  const { persistedEndpoint } = props
  const [endpoint, setEndpointData] = useState<EndpointForm>(defaultEndpointForm)
  const [sleepTimeControl, setSleepTimeControl] = useState<SleepTimeData | undefined>(undefined)

  // TODO: is there a better way to do this? (the `else` is annoying)
  useEffect(() => {
    !!persistedEndpoint ? setEndpointData(transformToForm(persistedEndpoint)) : setEndpointData(defaultEndpointForm)
  }, [persistedEndpoint])

  /*
   * TODO: bad usage of `!` - generally, there should be a messaging service
   * that will accept all these errors
   */
  const handleCancel: () => void = () => dispatch(showEndpoint(persistedEndpoint!.id))
  const handleCreate: () => void = () => {
    const formAsEndpoint = transformToEndpoint(endpoint, sleepTimeControl!) // might throw
    dispatch(submitCreateEndpointAsync({ endpoint: formAsEndpoint }))
  }
  const handleUpdate: () => void = () => {
    const formAsEndpoint = transformToEndpoint(endpoint, sleepTimeControl!) // might throw
    dispatch(submitUpdateEndpointAsync({ id: persistedEndpoint!.id, endpoint: formAsEndpoint }))
  }

  function handleChangeValue(key: keyof Endpoint) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointData({ ...endpoint, [key]: event.target.value });
    }
  };

  function Controls() {
    if (!!persistedEndpoint) {
      return (
        <>
          <FieldItem flex={0}>
            <Button variant="outlined" color='secondary' onClick={handleCancel}>Cancel</Button>
          </FieldItem>
          <FieldItem flex={0} >
            <Button variant="outlined" color='primary' onClick={handleUpdate}>Save</Button>
          </FieldItem>
        </>
      )
    }
    return (
      <>
        <FieldItem flex={0}>
          <Button variant="outlined" color='secondary' onClick={handleCancel}>Cancel</Button>
        </FieldItem>
        <FieldItem flex={0} >
          <Button variant="outlined" color='primary' onClick={handleCreate}>Create</Button>
        </FieldItem>
      </>
    )
  }

  return (
    <>
      <Form>
        <div>
          <FieldRow>
            <FieldItem flex={3}>
              <TextField fullWidth select label="Verb" defaultValue={'GET'} value={endpoint.verb} onChange={handleChangeValue('verb')}>
                {verbs.map(verb => <MenuItem key={verb} value={verb}>{verb}</MenuItem>)}
              </TextField>
            </FieldItem>
            <FieldItem flex={15}>
              <TextField fullWidth label="Path" value={endpoint.path} onChange={handleChangeValue('path')}></TextField>
            </FieldItem>
            <FieldItem flex={3}>
              <TextField fullWidth label="Status Code" value={endpoint.statusCode} onChange={handleChangeValue('statusCode')}></TextField>
            </FieldItem>
          </FieldRow>
          <FieldRow>
            <TextField
              multiline
              fullWidth
              minRows={8}
              maxRows={10}
              label="Return Value"
              value={endpoint.returnValue}
              inputProps={{ style: { fontFamily: 'monospace' } }}
              onChange={handleChangeValue('returnValue')}></TextField>
          </FieldRow>
          <FieldRow justifyContent="space-between">
            <FieldRow justifyContent="start">
              <SleepTimeControl
                sleepTimeData={{ min: endpoint.minResponseMillis, max: endpoint.maxResponseMillis, sleepType: endpoint.sleepType }}
                onChange={setSleepTimeControl}
              />
            </FieldRow>
            <FieldRow justifyContent="end">

            </FieldRow>
          </FieldRow>
        </div>
        <div>
          <FieldRow justifyContent="end">
            <Controls />
          </FieldRow>
        </div>
      </Form>
    </>

  )
}