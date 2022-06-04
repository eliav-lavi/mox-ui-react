import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Color } from '../design/colors'
import { PersistedEndpoint } from '../model/endpoint.model'
import { createEndpoint, getAllEndpointsAsync, showEndpoint } from '../state/endpointsSlice'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { Panel } from './Panel'

const TableWrapper = styled.div`
  display: flex;
  height: 85%;
  margin: 20px 120px;
  padding: 20px;
`
const Table = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  overflow: hidden;
  border-color: gray;
  border-style: solid;
  border-width: 1px;
`

const SelectionItemsList = styled.div`
  background-color: ${Color.Gray200};
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  height: 100%;
  transition: all 0.3s;

  border-right-color: #d0d0d0;
  border-right-style: solid;
  border-right-width: 1px;
`

const StyledSelectionItem = styled.div`
  background-color: ${Color.Gray200};
  height: 60px;
  min-height: 60px;
  border-bottom-color: #d0d0d0;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex ;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${Color.Purple100};
  }
  &:active {
    background-color: ${Color.Purple200} ;
  }
`

function EndpointSelectionItem(props: { endpoint: PersistedEndpoint }) {
  const dispatch = useAppDispatch()
  const { endpoint } = props
  return (
    <StyledSelectionItem onClick={() => dispatch(showEndpoint(endpoint.id))}>
      <div><code>{endpoint.verb} {endpoint.path}</code></div>
    </StyledSelectionItem>)
}

function CreateEndpointSelectionItem() {
  const dispatch = useAppDispatch()

  return (
    <StyledSelectionItem onClick={() => dispatch(createEndpoint())}>
      <AddCircleOutlineOutlinedIcon />
    </StyledSelectionItem>)
}

export function EndpointsTable() {
  const dispatch = useAppDispatch()
  useEffect(() => { dispatch(getAllEndpointsAsync()) }, [dispatch])
  const endpoints = useAppSelector((state) => state.endpoints.endpoints)

  return (
    <TableWrapper>
      <Table>
        <SelectionItemsList>
          <CreateEndpointSelectionItem />
          {endpoints.map(endpoint => <EndpointSelectionItem endpoint={endpoint} key={endpoint.id} />)}
        </SelectionItemsList>
        <Panel />
      </Table>
    </TableWrapper >
  )
}