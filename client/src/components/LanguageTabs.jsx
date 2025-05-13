
import { Tab } from '@headlessui/react';


const languages = ['python', 'C++', 'java'];

export default function LanguageTabs({ selected, onChange }) {
  return (
    <Tab.Group
      selectedIndex={languages.indexOf(selected)}
      onChange={(idx) => onChange(languages[idx])}
    >
      <Tab.List className="flex space-x-2 bg-gray-800 p-1 rounded">
        {languages.map((lang) => (
          <Tab
            key={lang}
            className={({ selected }) =>
              selected
                ? 'bg-amber-600 text-white px-4 py-2 rounded'
                : 'text-gray-300 hover:bg-gray-700 px-4 py-2 rounded'
            }
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}

  
