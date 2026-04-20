export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-4 text-center text-xs text-gray-400">
      LocalNY · Data from{' '}
      <a href="https://openstates.org" target="_blank" rel="noreferrer" className="hover:underline">OpenStates</a>
      {', '}
      <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer" className="hover:underline">OpenStreetMap</a>
      {', and the '}
      <a href="https://www.census.gov" target="_blank" rel="noreferrer" className="hover:underline">US Census Bureau</a>
      {' · © 2026'}
    </footer>
  );
}