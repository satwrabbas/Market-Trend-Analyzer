
import React from 'react';
import type { MarketAnalysis, Translations } from '../types';
import SectionCard from './SectionCard';
import { BriefcaseIcon, ChartBarIcon, LightBulbIcon, ShieldExclamationIcon, BuildingOfficeIcon, EyeIcon } from './IconComponents';

interface AnalysisDisplayProps {
  analysis: MarketAnalysis;
  t: Translations;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, t }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        {t.analysisFor} <span className="text-blue-500">{analysis.topic}</span>
      </h2>

      <SectionCard title={t.summary} icon={<BriefcaseIcon />}>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{analysis.summary}</p>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SectionCard title={t.trends} icon={<ChartBarIcon />}>
          <ul className="space-y-4">
            {analysis.current_trends.map((trend, index) => (
              <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">{trend.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{trend.description}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={t.players} icon={<BuildingOfficeIcon />}>
          <ul className="space-y-4">
            {analysis.key_players.map((player, index) => (
              <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">{player.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{player.description}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={t.opportunities} icon={<LightBulbIcon />}>
          <ul className="list-disc list-inside space-y-2 text-green-700 dark:text-green-400">
            {analysis.opportunities.map((item, index) => (
              <li key={index}><span className="text-gray-600 dark:text-gray-300">{item}</span></li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={t.threats} icon={<ShieldExclamationIcon />}>
          <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-400">
            {analysis.threats.map((item, index) => (
              <li key={index}><span className="text-gray-600 dark:text-gray-300">{item}</span></li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title={t.outlook} icon={<EyeIcon />}>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{analysis.future_outlook}</p>
      </SectionCard>
    </div>
  );
};

export default AnalysisDisplay;
