import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { FieldItem } from "../design/form-fields"
import { defaultEndpointForm, defaultEndpointForm2, EndpointForm, EndpointForm2 } from "../model/endpoint-form.model"
import { PersistedEndpoint } from "../model/endpoint.model"
import { transformToForm } from "../services/form-transformations"
import { editEndpoint, submitDeleteEndpointAsync } from "../state/endpointsSlice"
import { useAppDispatch } from "../state/hooks"


export function ShowEndpoint(props: { persistedEndpoint: PersistedEndpoint }) {
  const dispatch = useAppDispatch()
  const [endpointData, setEndpointData] = useState<EndpointForm2>(defaultEndpointForm2)

  // const [endpoint, setEndpointData] = useState<EndpointForm>(defaultEndpointForm)

  const { persistedEndpoint } = props

  const handleEdit: () => void = () => dispatch(editEndpoint(persistedEndpoint.id))
  const handleDelete: () => void = () => dispatch(submitDeleteEndpointAsync({ id: persistedEndpoint.id }))

  useEffect(() => {
    setEndpointData(transformToForm(persistedEndpoint))
  }, [persistedEndpoint])


  return (
    <>
      <code>
        {JSON.stringify(endpointData, null, 4)}
      </code>
      <>
        <FieldItem flex={0}>
          <Button variant="outlined" color='warning' onClick={handleDelete}>Delete</Button>
        </FieldItem>
        <FieldItem flex={0}>
          <Button variant="outlined" color='primary' onClick={handleEdit}>Edit</Button>
        </FieldItem>
      </>
    </>
  )
}