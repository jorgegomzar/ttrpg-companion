const Card = ({ children, title, icon: Icon, className = "" }) => (
  <div className={`bg-neutral-900/80 border border-neutral-800 p-4 rounded-lg shadow-xl backdrop-blur-sm ${className}`}>
    {title && (
      <div className="flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
        {Icon && <Icon className="w-5 h-5 text-red-700" />}
        <h3 className="text-xl font-serif text-neutral-200">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

export default Card;
