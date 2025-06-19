interface CardProps {
    title: string;
    subtitle?: string;
    tags: string[];
    onClick?: () => void;
    tagGradient?: boolean;
  }
  
  const Card = ({ title, subtitle, tags, onClick, tagGradient = false }: CardProps) => {
    return (
      <div
        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                tagGradient
                  ? 'bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-800 hover:scale-105 transition-transform'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default Card;