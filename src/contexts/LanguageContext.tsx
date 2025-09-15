import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: 'Home',
    assessment: 'Assessment',
    aiSupport: 'AI Support',
    resources: 'Resources',
    appointments: 'Appointments',
    community: 'Community',
    anonymousMode: 'Anonymous Mode',
    selectLanguage: 'Select Language',
    english: 'English',
    hindi: 'हिंदी',
    urdu: 'اردو',
    welcomeMessage: 'Welcome to SwasthMind - Your Mental Health Companion',
    assessmentTitle: 'Mental Health Assessment',
    chatTitle: 'AI Mental Health Support',
    appointmentsTitle: 'Book Appointments',
    resourcesTitle: 'Mental Health Resources',
    anonymousTitle: 'Anonymous Support'
  },
  hi: {
    home: 'होम',
    assessment: 'मूल्यांकन',
    aiSupport: 'AI सहायता',
    resources: 'संसाधन',
    appointments: 'अपॉइंटमेंट',
    community: 'समुदाय',
    anonymousMode: 'गुमनाम मोड',
    selectLanguage: 'भाषा चुनें',
    english: 'English',
    hindi: 'हिंदी',
    urdu: 'اردو',
    welcomeMessage: 'स्वास्थमाइंड में आपका स्वागत है - आपका मानसिक स्वास्थ्य साथी',
    assessmentTitle: 'मानसिक स्वास्थ्य मूल्यांकन',
    chatTitle: 'AI मानसिक स्वास्थ्य सहायता',
    appointmentsTitle: 'अपॉइंटमेंट बुक करें',
    resourcesTitle: 'मानसिक स्वास्थ्य संसाधन',
    anonymousTitle: 'गुमनाम सहायता'
  },
  ur: {
    home: 'ہوم',
    assessment: 'تشخیص',
    aiSupport: 'AI مدد',
    resources: 'وسائل',
    appointments: 'ملاقات',
    community: 'کمیونٹی',
    anonymousMode: 'گمنام موڈ',
    selectLanguage: 'زبان منتخب کریں',
    english: 'English',
    hindi: 'हिंदी',
    urdu: 'اردو',
    welcomeMessage: 'سواستھ مائنڈ میں خوش آمدید - آپ کا ذہنی صحت کا ساتھی',
    assessmentTitle: 'ذہنی صحت کی تشخیص',
    chatTitle: 'AI ذہنی صحت مدد',
    appointmentsTitle: 'ملاقات بک کریں',
    resourcesTitle: 'ذہنی صحت کے وسائل',
    anonymousTitle: 'گمنام مدد'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};