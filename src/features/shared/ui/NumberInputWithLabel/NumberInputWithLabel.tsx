import './NumberInputWithLabel.scss';

const NumberInputWithLabel = ({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
}) => {
  return (
    <div className="number-input-with-label">
      <input
        type="number"
        value={value}
        placeholder="0"
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
