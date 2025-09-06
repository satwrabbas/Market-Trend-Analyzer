
import React, { useState, useCallback, useEffect } from 'react';
import { fetchMarketAnalysis } from './services/geminiService';
import type { MarketAnalysis, Language, Translations } from './types';
import InputForm from './components/InputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WelcomeScreen from './components/WelcomeScreen';

const enStrings: Translations = {
  appTitle: "Market Trend",
  appTitleHighlight: "Analyzer",
  languageButton: "العربية",
  inputLabel: "Enter an Industry or Topic",
  inputPlaceholder: "e.g., 'Artificial Intelligence in Healthcare'",
  submitButton: "Generate Analysis",
  submittingButton: "Analyzing...",
  analysisFor: "Market Analysis for:",
  summary: "Executive Summary",
  trends: "Current Trends",
  players: "Key Players",
  opportunities: "Opportunities",
  threats: "Threats",
  outlook: "Future Outlook",
  loadingMessages: [
    "Analyzing market signals...",
    "Consulting with digital economists...",
    "Synthesizing industry data...",
    "Forecasting future trends...",
    "Compiling insights...",
  ],
  errorTitle: "An error occurred",
  welcomeTitle: "Welcome to the Market Trend Analyzer",
  welcomeText: "Unlock powerful AI-driven insights into any industry. Simply enter a topic above and click \"Generate Analysis\" to receive a comprehensive report on current trends, opportunities, threats, and more.",
  example1: "AI in Healthcare",
  example2: "Sustainable Fashion",
  example3: "Electric Vehicles",
  example4: "Quantum Computing",
  footer: "Powered by Google Gemini API"
};

const arStrings: Translations = {
  appTitle: "محلل اتجاهات",
  appTitleHighlight: "السوق",
  languageButton: "English",
  inputLabel: "أدخل صناعة أو موضوع",
  inputPlaceholder: "على سبيل المثال، 'الذكاء الاصطناعي في الرعاية الصحية'",
  submitButton: "إنشاء تحليل",
  submittingButton: "جاري التحليل...",
  analysisFor: "تحليل السوق لـ:",
  summary: "ملخص تنفيذي",
  trends: "الاتجاهات الحالية",
  players: "اللاعبون الرئيسيون",
  opportunities: "الفرص",
  threats: "التهديدات",
  outlook: "التوقعات المستقبلية",
  loadingMessages: [
    "تحليل إشارات السوق...",
    "التشاور مع الاقتصاديين الرقميين...",
    "تجميع بيانات الصناعة...",
    "توقع الاتجاهات المستقبلية...",
    "تجميع الرؤى...",
  ],
  errorTitle: "حدث خطأ",
  welcomeTitle: "مرحباً بك في محلل اتجاهات السوق",
  welcomeText: "احصل على رؤى قوية مدعومة بالذكاء الاصطناعي في أي صناعة. ما عليك سوى إدخال موضوع أعلاه والنقر فوق \"إنشاء تحليل\" للحصول على تقرير شامل عن الاتجاهات الحالية والفرص والتهديدات والمزيد.",
  example1: "الذكاء الاصطناعي في الرعاية الصحية",
  example2: "الأزياء المستدامة",
  example3: "السيارات الكهربائية",
  example4: "الحوسبة الكمومية",
  footer: "مدعوم بواسطة Google Gemini API"
};

const translations = {
  en: enStrings,
  ar: arStrings,
};

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };

  const handleAnalysis = useCallback(async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await fetchMarketAnalysis(topic, language);
      setAnalysis(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate analysis. Please try again. Error: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <header className="bg-white dark:bg-gray-800/50 shadow-sm sticky top-0 z-10 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t.appTitle} <span className="text-blue-500">{t.appTitleHighlight}</span>
            </h1>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              {t.languageButton}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <section className="mb-8">
          <InputForm onSubmit={handleAnalysis} isLoading={isLoading} t={t} />
        </section>

        <section>
          {isLoading && <LoadingSpinner t={t} />}
          {error && <ErrorMessage message={error} t={t} />}
          {analysis && <AnalysisDisplay analysis={analysis} t={t} />}
          {!isLoading && !error && !analysis && <WelcomeScreen t={t} />}
        </section>
      </main>
      
      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};

export default App;
