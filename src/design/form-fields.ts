import styled from "styled-components"

export const FieldRow = styled.div<{ justifyContent?: string }>`
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  justify-content: ${props => props.justifyContent};
`
export const FieldItem = styled.div<{ flex: number | string }>`
  &:not(:last-of-type) {
    padding-right: 10px;
  }
  flex: ${props => props.flex};
`