
import React from 'react';
import type { Translations } from '../types';

interface ErrorMessageProps {
  message: string;
  t: Translations;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, t }) => {
  return (
    <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md shadow-md" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-11a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0V7zm1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">{t.errorTitle}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
