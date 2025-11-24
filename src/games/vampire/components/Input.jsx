const Input = ({ label, value, onChange, placeholder, className = "", type = "text" }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && (
      <label className="text-xs text-red-900/70 uppercase tracking-widest font-bold">
        {label}
      </label>
    )}
    <input 
      type={type} 
      value={value} 
      onChange={onChange}
      placeholder={placeholder}
      className="bg-neutral-950 border border-neutral-800 text-neutral-300 px-3 py-2 rounded focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 font-serif placeholder-neutral-700"
    />
  </div>
);

export default Input;
