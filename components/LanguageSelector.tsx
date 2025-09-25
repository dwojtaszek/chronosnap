import React from 'react';
import { useTranslations, Locale } from '../context/LanguageContext';

// Fix: The array initialization is separated from the sort call.
// This allows the contextual type from the variable declaration to be applied to the array literal,
// ensuring that the `code` property is correctly typed as `Locale`.
const languages: { code: Locale, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'pl', name: 'Polski' },
    { code: 'bg', name: 'Български' },
    { code: 'cs', name: 'Čeština' },
    { code: 'da', name: 'Dansk' },
    { code: 'de', name: 'Deutsch' },
    { code: 'el', name: 'Ελληνικά' },
    { code: 'es', name: 'Español' },
    { code: 'et', name: 'Eesti' },
    { code: 'fi', name: 'Suomi' },
    { code: 'fr', name: 'Français' },
    { code: 'ga', name: 'Gaeilge' },
    { code: 'hr', name: 'Hrvatski' },
    { code: 'hu', name: 'Magyar' },
    { code: 'it', name: 'Italiano' },
    { code: 'lt', name: 'Lietuvių' },
    { code: 'lv', name: 'Latviešu' },
    { code: 'mt', name: 'Malti' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'pt', name: 'Português' },
    { code: 'ro', name: 'Română' },
    { code: 'sk', name: 'Slovenčina' },
    { code: 'sl', name: 'Slovenščina' },
    { code: 'sv', name: 'Svenska' },
    { code: 'uk', name: 'Українська' },
];

languages.sort((a, b) => {
    if (a.code === 'en') return -1;
    if (b.code === 'en') return 1;
    if (a.code === 'pl') return -1;
    if (b.code === 'pl') return 1;
    return a.name.localeCompare(b.name);
});


export const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useTranslations();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as Locale);
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={handleLanguageChange}
        className="bg-gray-800 text-white rounded-md py-1 pl-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
        aria-label="Select language"
      >
        {languages.map(({ code, name }) => (
            <option key={code} value={code}>
                {name}
            </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
};
