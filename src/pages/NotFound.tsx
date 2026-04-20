import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center mt-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-500 mb-8">This page doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline text-sm">
        Go back home
      </Link>
    </div>
  );
}
