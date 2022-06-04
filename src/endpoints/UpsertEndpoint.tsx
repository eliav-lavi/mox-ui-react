import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FieldItem, FieldRow } from "../design/form-fields"
import { defaultEndpointForm2, EndpointForm2, MainForm, SleepTimeForm } from "../model/endpoint-form.model"
import { Endpoint, PersistedEndpoint } from "../model/endpoint.model"
import { transformToEndpoint, transformToForm } from "../services/form-transformations"
import { showEndpoint, submitCreateEndpointAsync, submitUpdateEndpointAsync } from "../state/endpointsSlice"
import { useAppDispatch } from "../state/hooks"
import { MainControl } from "./MainControl"
import { SleepTimeControl } from "./SleepTimeControl"



const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between ;
  height: 100%;
`

export function UpsertEndpoint(props: { persistedEndpoint?: PersistedEndpoint }) {
  const dispatch = useAppDispatch()
  const { persistedEndpoint } = props
  const [endpointForm, setEndpointForm] = useState<EndpointForm2>(defaultEndpointForm2)
  const [mainDataControl, setMainDataControl] = useState<MainForm>(defaultEndpointForm2.main)
  const [sleepTimeDataControl, setSleepTimeDataControl] = useState<SleepTimeForm>(defaultEndpointForm2.sleepTime)

  useEffect(() => {
    if (!!persistedEndpoint) {
      const endpointForm2 = transformToForm(persistedEndpoint)
      setEndpointForm(endpointForm2)
      setMainDataControl(endpointForm2.main)
      setSleepTimeDataControl(endpointForm2.sleepTime)
    } else {
      setEndpointForm(defaultEndpointForm2)
      setMainDataControl(defaultEndpointForm2.main)
      setSleepTimeDataControl(defaultEndpointForm2.sleepTime)
    }
  }, [persistedEndpoint])

  /*
   * TODO: bad usage of `!` - generally, there should be a messaging service
   * that will accept all these errors
   */
  const handleCancel: () => void = () => dispatch(showEndpoint(persistedEndpoint!.id))
  const handleCreate: () => void = () => {
    const formAsEndpoint = transformToEndpoint({ main: mainDataControl, sleepTime: sleepTimeDataControl }) // might throw
    dispatch(submitCreateEndpointAsync({ endpoint: formAsEndpoint }))
  }
  const handleUpdate: () => void = () => {
    const formAsEndpoint = transformToEndpoint({ main: mainDataControl, sleepTime: sleepTimeDataControl }) // might throw
    dispatch(submitUpdateEndpointAsync({ id: persistedEndpoint!.id, endpoint: formAsEndpoint }))
  }

  function handleChangeValue(key: keyof Endpoint) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setMainDataControl({ ...mainDataControl, [key]: event.target.value });
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
    <Form>
      <div>
        <MainControl mainData={endpointForm.main} onChange={setMainDataControl} />
        <FieldRow justifyContent="start">
          <SleepTimeControl sleepTimeData={endpointForm.sleepTime} onChange={setSleepTimeDataControl} />
        </FieldRow>
      </div>
      <div>
        <FieldRow justifyContent="end">
          <Controls />
        </FieldRow>
      </div>
    </Form>
  )
}