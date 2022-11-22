import "./Button.scss";

function Button({
  className,
  leftIcon,
  rightIcon,
  text,
  children,
  disabled,
  ...props
}) {
  return (
    <button
      className={`btn btn-common ${className} ${disabled ? "disabled" : ""} `}
      {...props}
      disabled={disabled}
    >
      {leftIcon && <span className="icon left-icon">{leftIcon}</span>}
      <span className="children" style={{fontWeight: '600'}}>{children}</span>
      {rightIcon && <span className="icon right-icon">{rightIcon}</span>}
    </button>
  ); 
}

export default Button;
