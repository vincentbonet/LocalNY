import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Enter your address...' }: Props) {
  const [value, setValue] = useState('');

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(value)}
        placeholder={placeholder}
        className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      <button
        onClick={() => onSearch(value)}
        className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        Search
      </button>
    </div>
  );
}