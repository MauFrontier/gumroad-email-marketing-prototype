type Props = {
  label?: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

const Button = ({
  label,
  onClick,
  disabled = false,
  className,
  children,
}: Props) => {
  return (
    <button
      data-testid="Button"
      onClick={onClick}
      aria-label={label}
      type="button"
      disabled={disabled}
      className={className}>
      {children}
    </button>
  );
};

export default Button;
