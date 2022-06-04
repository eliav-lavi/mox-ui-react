import SettingsEthernetOutlinedIcon from '@mui/icons-material/SettingsEthernetOutlined';
import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';

import { FieldItem } from '../design/form-fields';


export type SleepType = 'none' | 'fixed' | 'range'
export type SleepTime = { min: string, max: string }
export type SleepTimeData = SleepTime & { sleepType: SleepType }

export function SleepTimeControl(props: { sleepTimeData: SleepTimeData, onChange: (sleepTimeData: SleepTimeData) => void }) {
  const { sleepType, min, max } = props.sleepTimeData
  const { onChange } = props
  const [currentSleepTimeData, setCurrentSleepTimeData] = useState<SleepTimeData>({ min, max, sleepType })
  // const [currentSleepTime, setSleepTime] = useState<SleepTime>({ min, max })
  // const [currentSleepTimeData.sleepType, setSleepType] = useState<SleepType>(sleepType);

  useEffect(() => {
    setCurrentSleepTimeData({ min, max, sleepType })
    // setSleepTime({ min, max })
    // setSleepType(sleepType)
  }, [min, max, sleepType])


  const handleSleepType = (_: React.MouseEvent<HTMLElement>, newSleepType: SleepType) => {
    if (!!newSleepType) {
      setCurrentSleepTimeData({ ...currentSleepTimeData, sleepType: newSleepType });
      // if(sleepType === 'fixed') {
      //   setSleepTime({min: currentSleepTime.min ,max: ''})
      // }
      // if(sleepType === 'none') {
      //   setSleepTime({min: '', max: ''})
      // }
    }
  };

  return (
    <>
      <FieldItem flex={0}>
        <ToggleButtonGroup value={currentSleepTimeData.sleepType} exclusive onChange={handleSleepType} size='small'>
          <ToggleButton value="none">
            <TimerOffOutlinedIcon />
          </ToggleButton>
          <ToggleButton value="fixed" >
            <TimerOutlinedIcon />
          </ToggleButton>
          <ToggleButton value="range">
            <SettingsEthernetOutlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </FieldItem>
      <FieldItem flex={0}>
        <TextField
          fullWidth
          value={currentSleepTimeData.min}
          onChange={(e) => { setCurrentSleepTimeData({ ...currentSleepTimeData, min: e.target.value }); onChange(currentSleepTimeData) }}
          style={{ minWidth: '200px' }}
          size='small'
          disabled={currentSleepTimeData.sleepType === 'none'}
          label={currentSleepTimeData.sleepType === 'range' ? "Min Response Time" : "Response Time"}
        ></TextField>
      </FieldItem>

      {currentSleepTimeData.sleepType === 'range' &&
        <FieldItem flex={0}>
          <TextField
            fullWidth
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={currentSleepTimeData.max}
            onChange={(e) => { setCurrentSleepTimeData({ ...currentSleepTimeData, max: e.target.value }); onChange(currentSleepTimeData) }}
            style={{ minWidth: '200px' }}
            size='small'
            label="Max Response Time"
          ></TextField>
        </FieldItem>
      }
    </>
  );

}