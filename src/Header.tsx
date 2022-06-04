import Switch from '@mui/material/Switch';
import styled from 'styled-components'

import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { toggle } from './state/configSlice';
import { Color } from './design/colors';

const HeaderWrapper = styled.div`
  background-color: ${Color.Gray200} ;
  height: 50px;
  display: flex ;
  flex-direction: row ;
  justify-content: space-between ;
  padding-left: 20px ;
  padding-right: 20px ;
  align-items: center ;
`

export function Header() {
  const isDarkModeEnabled = useAppSelector((state) => state.configs.isDarkModeEnabled)
  const dispatch = useAppDispatch()

  return (
    <HeaderWrapper>
      <div>
        <code> m o x</code>
      </div>
      <div style={{ display: 'flex' }}>
        <Switch size={'small'} checked={isDarkModeEnabled} onChange={() => dispatch(toggle())} />
        {isDarkModeEnabled ? <ModeNightIcon fontSize='small' /> : <LightModeIcon fontSize='small' />}
      </div>
    </HeaderWrapper>
  )
}