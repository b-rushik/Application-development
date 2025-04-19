import { Link } from 'react-router-dom';
import { FileSearch } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center sm:px-6 lg:px-8">
      <FileSearch className="mb-8 h-24 w-24 text-primary-500" />
      <h1 className="mb-4 text-6xl font-bold text-primary-800">404</h1>
      <h2 className="mb-6 text-3xl font-semibold text-gray-900">Page Not Found</h2>
      <p className="mb-8 max-w-md text-lg text-gray-600">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link to="/">
        <Button size="lg">Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;