import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';

// Lazy load components for better performance
const CoinPage = React.lazy(() => import('./pages/CoinPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#EFF2F5]">
        <Header />
        <Suspense fallback={
          <div className="flex justify-center items-center h-[calc(100vh-64px)]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <Routes>
            {/* Redirect root to bitcoin by default */}
            <Route path="/" element={<Navigate to="/bitcoin" replace />} />
            
            {/* Dynamic coin routes */}
            <Route path="/:coinId" element={<CoinPage />} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;