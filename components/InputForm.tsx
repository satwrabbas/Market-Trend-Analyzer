
import React, { useState } from 'react';
import type { Translations } from '../types';

interface InputFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
  t: Translations;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, t }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic.trim());
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic-input" className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
          {t.inputLabel}
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            id="topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.inputPlaceholder}
            disabled={isLoading}
            className="flex-grow w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all duration-200 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.submittingButton}
              </>
            ) : (
              t.submitButton
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
