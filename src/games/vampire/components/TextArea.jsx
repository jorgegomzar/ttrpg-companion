const TextArea = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-xs text-red-900/70 uppercase tracking-widest font-bold">
        {label}
      </label>
    )}
    <textarea 
      value={value} 
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      className="bg-neutral-950 border border-neutral-800 text-neutral-300 px-3 py-2 rounded focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 font-serif placeholder-neutral-700 resize-none"
    />
  </div>
);

export default TextArea;
