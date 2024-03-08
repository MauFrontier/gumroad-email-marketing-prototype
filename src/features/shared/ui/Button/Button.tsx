type Props = {
  label?: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

const Button = ({label, onClick, className, children}: Props) => {
  return (
    <button
      data-testid="Button"
      onClick={onClick}
      aria-label={label}
      className={className}>
      {children}
    </button>
  );
};

export default Button;
