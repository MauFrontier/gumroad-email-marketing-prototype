type Props = {
  label?: string;
  disabled?: boolean;
  onClick: () => void;
  pressed?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Button = ({
  label,
  onClick,
  disabled = false,
  pressed = false,
  className,
  children,
}: Props) => {
  return (
    <button
      data-testid="Button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      type="button"
      disabled={disabled}
      className={className}>
      {children}
    </button>
  );
};

export default Button;
