type Props = {
  label?: string;
  onClick: () => void;
  children?: React.ReactNode;
};

const Button = ({label, onClick, children}: Props) => {
  return (
    <button data-testid="Button" onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
};

export default Button;
