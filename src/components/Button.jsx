const Button = ({ onClick, children, className = "", variant = "primary", disabled = false, title = "" }) => {
  const baseStyle = "px-4 py-2 rounded font-serif transition-all duration-300 flex items-center justify-center gap-2 border shadow-lg";
  const variants = {
    primary: "bg-red-900 hover:bg-red-800 text-red-100 border-red-950 hover:shadow-red-900/50",
    secondary: "bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700",
    outline: "bg-transparent border-red-900/50 text-red-200 hover:bg-red-900/20",
    danger: "bg-neutral-900 border-red-900/30 text-red-500 hover:text-red-400 hover:border-red-500",
    success: "bg-green-900 border-green-800 text-green-100 hover:bg-green-800",
    hub: "bg-indigo-900 hover:bg-indigo-800 text-indigo-100 border-indigo-950 hover:shadow-indigo-900/50"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      title={title}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
