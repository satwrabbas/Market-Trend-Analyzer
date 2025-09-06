
import React from 'react';
import { BriefcaseIcon } from './IconComponents';
import type { Translations } from '../types';

interface WelcomeScreenProps {
  t: Translations;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ t }) => {
  return (
    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fade-in">
      <div className="flex justify-center items-center mb-4">
        <BriefcaseIcon />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t.welcomeTitle}</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {t.welcomeText}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full">{t.example1}</span>
        <span className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-3 py-1 rounded-full">{t.example2}</span>
        <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full">{t.example3}</span>
        <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full">{t.example4}</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
