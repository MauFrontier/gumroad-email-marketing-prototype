type Props = {
  id?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
};

const TextInput = ({
  id,
  placeholder,
  label,
  value,
  onChange,
  invalid,
  disabled,
  required,
}: Props) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      aria-label={label || placeholder || ''}
      id={id}
      value={value}
      disabled={disabled}
      required={required}
      aria-invalid={invalid ? 'true' : 'false'}
      onChange={e => onChange?.(e.target.value)}
    />
  );
};

export default TextInput;
