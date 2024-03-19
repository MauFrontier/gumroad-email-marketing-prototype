import './NumberInputWithLabel.scss';

type Props = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  disabled?: boolean;
};

const NumberInputWithLabel = ({
  value,
  onChange,
  label,
  disabled = false,
}: Props) => {
  return (
    <div className="number-input-with-label">
      <input
        type="number"
        value={value}
        placeholder="0"
        disabled={disabled}
        onChange={e => onChange?.(parseInt(e.target.value))}
        aria-labelledby="input-label"
      />
      <label id="input-label" className="input-label">
        {label}
      </label>
    </div>
  );
};

export default NumberInputWithLabel;
