
import React from 'react';
import type { Translations } from '../types';

interface LoadingSpinnerProps {
  t: Translations;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ t }) => {
  const messages = t.loadingMessages;
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    // Ensure we reset to the first message of the current language if messages array changes
    setMessage(messages[0]); 

    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="text-lg text-gray-600 dark:text-gray-300 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
