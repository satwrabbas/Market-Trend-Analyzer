
export type Language = 'en' | 'ar';

export interface Trend {
  name: string;
  description: string;
}

export interface KeyPlayer {
  name: string;
  description: string;
}

export interface MarketAnalysis {
  topic: string;
  summary: string;
  current_trends: Trend[];
  opportunities: string[];
  threats: string[];
  key_players: KeyPlayer[];
  future_outlook: string;
}

export interface Translations {
  appTitle: string;
  appTitleHighlight: string;
  languageButton: string;
  inputLabel: string;
  inputPlaceholder: string;
  submitButton: string;
  submittingButton: string;
  analysisFor: string;
  summary: string;
  trends: string;
  players: string;
  opportunities: string;
  threats: string;
  outlook: string;
  loadingMessages: string[];
  errorTitle: string;
  welcomeTitle: string;
  welcomeText: string;
  example1: string;
  example2: string;
  example3: string;
  example4: string;
  footer: string;
}
