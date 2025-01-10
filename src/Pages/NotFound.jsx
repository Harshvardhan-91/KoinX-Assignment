const NotFound = () => {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-8">The coin you're looking for doesn't exist.</p>
        <a 
          href="/bitcoin" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Bitcoin
        </a>
      </div>
    );
  };
  
  export default NotFound;