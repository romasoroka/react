import React from 'react';

interface InfoCardProps {
  value: string | number;
  label: string;
  bgColor?: string;
  textColor?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  value,
  label,
  bgColor = 'bg-blue-50 dark:bg-gray-700',
  textColor = 'text-blue-600',
}) => {
  return (
    <div className={`p-2 rounded-lg ${bgColor} text-center`}>
      <span className={`text-2xl font-bold ${textColor}`}>{value}</span>
      <p className="text-sm text-gray-600 dark:text-blue-100">{label}</p>
    </div>
  );
};

export default InfoCard;
