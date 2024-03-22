import {KeyValuePair} from '../../../sharedTypes';

type Props = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  options: KeyValuePair[];
  disabled?: boolean;
};

const Select = ({value, onChange, label, options, disabled = false}: Props) => {
  return (
    <select
      value={value}
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
      aria-label={label || undefined}>
      {options.map(option => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Select;
