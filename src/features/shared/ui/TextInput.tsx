type Props = {
  id?: string;
  placeholder?: string;
};

const TextInput = ({id, placeholder}: Props) => {
  return <input type="text" placeholder={placeholder} id={id} />;
};

export default TextInput;
