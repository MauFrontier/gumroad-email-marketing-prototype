import {KeyValuePair} from '../../sharedTypes';

type Props = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  options: KeyValuePair[];
};

const NumberInputWithLabel = ({value, onChange, label, options}: Props) => {
  return (
    <select
      value={value}
      onChange={e => onChange?.(e.target.value)}
      aria-label={label || undefined}>
      {options.map(option => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default NumberInputWithLabel;
