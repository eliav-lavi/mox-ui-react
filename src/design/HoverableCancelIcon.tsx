import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from 'react';
import { Color } from './colors';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer
`

export function HoverableCancelIcon(props: { onClick: () => void }) {
  const { onClick } = props
  const [isHover, setIsHover] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const color = isActive ? Color.Gray400 : (isHover ? Color.Purple300 : Color.Gray400)
  return (
    <Wrapper onClick={onClick} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onMouseDown={() => setIsActive(true)} onMouseUp={() => setIsActive(false)} >
      <CancelOutlinedIcon htmlColor={color} />
    </Wrapper >
  )
}