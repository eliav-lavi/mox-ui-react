import SettingsEthernetOutlinedIcon from '@mui/icons-material/SettingsEthernetOutlined';
import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import { FieldItem } from '../design/form-fields';
import { defaultEndpointForm2, SleepTimeForm } from '../model/endpoint-form.model';


export type SleepType = 'none' | 'fixed' | 'range'
export type SleepTime = { min: string, max: string }

export function SleepTimeControl(props: { sleepTimeData: SleepTimeForm, onChange: (sleepTimeData: SleepTimeForm) => void }) {
  const { onChange } = props
  const [currentSleepTimeData, setCurrentSleepTimeData] = useState<SleepTimeForm>(props.sleepTimeData)
  const [initDone, setInitDone] = useState(false)

  /* 
   * These 2 effects help with the problem of using `useState` from passed props (initial data)
   * together with subscribing the passed `onChange` to state changes.
   * Ideally there's another way to do that.
   */
  useEffect(() => {
    if (!!initDone || props.sleepTimeData === defaultEndpointForm2.sleepTime) {
      return
    }
    setCurrentSleepTimeData(props.sleepTimeData)
    setInitDone(true)
  }, [props, initDone])

  useEffect(() => {
    if (!initDone) {
      return
    }
    onChange(currentSleepTimeData)
  }, [currentSleepTimeData, initDone])

  const handleSleepType = (_: React.MouseEvent<HTMLElement>, newSleepType: SleepType) => {
    setCurrentSleepTimeData({ ...currentSleepTimeData, sleepType: newSleepType });
  };

  return (
    <>
      <FieldItem flex={0}>
        <ToggleButtonGroup value={currentSleepTimeData.sleepType} exclusive
          onChange={handleSleepType}
          size='small'>
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
          onChange={(e) => {
            setCurrentSleepTimeData({ ...currentSleepTimeData, min: e.target.value })
          }
          }
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
            onChange={(e) => {
              setCurrentSleepTimeData({ ...currentSleepTimeData, max: e.target.value })
            }
            }
            style={{ minWidth: '200px' }}
            size='small'
            label="Max Response Time"
          ></TextField>
        </FieldItem>}
    </>
  );

}