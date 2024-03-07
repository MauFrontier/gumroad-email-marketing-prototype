type Props = {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const TextInput = ({id, placeholder, value, onChange}: Props) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={e => onChange?.(e.target.value)}
    />
  );
};

export default TextInput;
