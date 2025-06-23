interface CardProps {
  title: string;
  subtitle?: string;
  tags: string[];
  onClick?: () => void;
  tagGradient?: boolean;
}

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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col min-h-[160px]"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{subtitle}</p>}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              tagGradient
                ? 'bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 text-blue-800 dark:text-blue-200 hover:scale-105 transition-transform'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
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