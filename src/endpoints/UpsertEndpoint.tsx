import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FieldItem, FieldRow, Form } from "../design/form-fields"
import { defaultEndpointForm as defaultEndpointForm, EndpointForm, HeadersForm, MainForm, SleepTimeForm } from "../model/endpoint-form.model"
import { Endpoint, PersistedEndpoint } from "../model/endpoint.model"
import { transformToEndpoint, transformToForm } from "../services/form-transformations"
import { showEndpoint, submitCreateEndpointAsync, submitUpdateEndpointAsync } from "../state/endpointsSlice"
import { useAppDispatch } from "../state/hooks"
import { HeadersControl } from "./HeadersControl"
import { MainControl } from "./MainControl"
import { SleepTimeControl } from "./SleepTimeControl"


export function UpsertEndpoint(props: { persistedEndpoint?: PersistedEndpoint }) {
  const dispatch = useAppDispatch()
  const { persistedEndpoint } = props
  const [endpointForm, setEndpointForm] = useState<EndpointForm>(defaultEndpointForm)
  const [mainDataControl, setMainDataControl] = useState<MainForm>(defaultEndpointForm.main)
  const [sleepTimeDataControl, setSleepTimeDataControl] = useState<SleepTimeForm>(defaultEndpointForm.sleepTime)
  const [headersDataControl, setHeadersDataControl] = useState<HeadersForm>(defaultEndpointForm.headers)

  useEffect(() => {
    if (!!persistedEndpoint) {
      const endpointForm = transformToForm(persistedEndpoint)
      setEndpointForm(endpointForm)
      setMainDataControl(endpointForm.main)
      setHeadersDataControl(endpointForm.headers)
      setSleepTimeDataControl(endpointForm.sleepTime)
    } else {
      setEndpointForm(defaultEndpointForm)
      setMainDataControl(defaultEndpointForm.main)
      setHeadersDataControl(defaultEndpointForm.headers)
      setSleepTimeDataControl(defaultEndpointForm.sleepTime)
    }
  }, [persistedEndpoint])

  /*
   * TODO: bad usage of `!` - generally, there should be a messaging service
   * that will accept all these errors
   */
  const handleCancel: () => void = () => dispatch(showEndpoint(persistedEndpoint!.id))
  const handleCreate: () => void = () => {
    const formAsEndpoint = transformToEndpoint({ main: mainDataControl, headers: headersDataControl, sleepTime: sleepTimeDataControl }) // might throw
    dispatch(submitCreateEndpointAsync({ endpoint: formAsEndpoint }))
  }
  const handleUpdate: () => void = () => {
    const formAsEndpoint = transformToEndpoint({
      main: mainDataControl,
      headers: headersDataControl,
      sleepTime: sleepTimeDataControl,
    }); // might throw
    dispatch(
      submitUpdateEndpointAsync({
        id: persistedEndpoint!.id,
        endpoint: formAsEndpoint,
      })
    );
  }

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
        <MainControl
          mainData={endpointForm.main}
          isUpdate={!!persistedEndpoint}
          onChange={setMainDataControl}
        />
        <HeadersControl
          headersData={endpointForm.headers}
          isUpdate={!!persistedEndpoint}
          onChange={setHeadersDataControl}
        />
        <FieldRow justifyContent="start">
          <SleepTimeControl
            sleepTimeData={endpointForm.sleepTime}
            isUpdate={!!persistedEndpoint}
            onChange={setSleepTimeDataControl}
          />
        </FieldRow>
      </div>
      <div>
        <FieldRow justifyContent="end">
          <Controls />
        </FieldRow>
      </div>
    </Form>
  );
}