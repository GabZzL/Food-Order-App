export default function Button({ children, textOnly, className, ...props }) {
  const classes = textOnly ? `text-button ${className}` : `button ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
