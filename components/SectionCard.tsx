
import React from 'react';

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-blue-500 mr-3">{icon}</span>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
