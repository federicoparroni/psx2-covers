import { PsVersion } from '../../models/models';
import './PsVersionSwitch.css';
import psXlogo from '/psXlogo.png';
import ps2logo from '/ps2logo.svg';

interface PsVersionSwitchProps {
  value: PsVersion | undefined
  setValue: (value: PsVersion | undefined) => void
}

function PsVersionSwitch({ value, setValue }: PsVersionSwitchProps) {

  return (
    <div className='tss'>
      <input type='radio' id='tss1' value='psx' checked={value === 'psx'} onChange={e => e.target.checked && setValue('psx')} />
      <label htmlFor='tss1'><span><img src={psXlogo} alt="PSX logo" /></span></label>

      <input type='radio' id='tss2' value='' checked={!value} onChange={e => e.target.checked && setValue(undefined)} />
      <label htmlFor='tss2'><span>All</span></label>  
      
      <input type='radio' id='tss3' value='ps2' checked={value === 'ps2'} onChange={e => e.target.checked && setValue('ps2')} />
      <label htmlFor='tss3'><span><img src={ps2logo} alt="PS2 logo" /></span></label>
    </div>
  );
}

export default PsVersionSwitch
