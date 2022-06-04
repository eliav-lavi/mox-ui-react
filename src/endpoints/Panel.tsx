import { Typography } from '@mui/material'
import styled from 'styled-components'
import { Color } from '../design/colors'
import { HoverableCancelIcon } from '../design/HoverableCancelIcon'
import { resetView } from '../state/endpointsSlice'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { UpsertEndpoint } from './UpsertEndpoint'
import { ShowEndpoint } from './ShowEndpoint'

const StyledPanel = styled.div`
  background-color: ${Color.Gray100};
  flex: 4;
  display: flex;
  justify-content: space-between ;

  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
`

export function Panel() {
  const dispatch = useAppDispatch()
  const endpoints = useAppSelector((state) => state.endpoints.endpoints)
  const viewType = useAppSelector((state) => state.endpoints.viewType)
  const selectedEndpointId = useAppSelector((state) => state.endpoints.selectedEnpointId)

  let item;
  if (viewType == 'none') {
    item = <DefaultPanel />
  }
  if (viewType == 'edit') {
    const endpoint = endpoints.find(endpoint => endpoint.id == selectedEndpointId)
    if (!endpoint) {
      throw `could not find endpoint ${selectedEndpointId}`
    }
    item = <UpsertEndpoint persistedEndpoint={endpoint} />
  }

  if (viewType == 'show') {
    const endpoint = endpoints.find(endpoint => endpoint.id == selectedEndpointId)
    if (!endpoint) {
      throw `could not find endpoint ${selectedEndpointId}`
    }
    item = <ShowEndpoint persistedEndpoint={endpoint} />
  }

  if (viewType == 'create') {
    item = <UpsertEndpoint />
  }

  return (
    <StyledPanel>
      <div style={{ overflowY: 'scroll', padding: '10px 15px', margin: '0px 30px', flex: 1 }}>
        {item}
      </div>
      <div>
        <HoverableCancelIcon onClick={() => dispatch(resetView())} />
      </div>
    </StyledPanel >
  );
}

function DefaultPanel() {
  return (
    <>
      <Typography variant='subtitle1'>Create a new endpoint or choose an existing one in order to view or edit it!</Typography>
    </>
  )
}