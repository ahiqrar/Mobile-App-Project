
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-indigo-900 flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className="text-center animate-pulse">
        <div className="w-24 h-24 bg-white rounded-2xl mb-6 mx-auto flex items-center justify-center shadow-2xl">
          <svg className="w-16 h-16 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <h1 className="text-white text-4xl font-serif font-bold tracking-wider">SimpleWords</h1>
        <p className="text-indigo-200 mt-2 text-sm tracking-widest uppercase">Premium Banquets</p>
      </div>
      <div className="mt-12">
        <div className="w-8 h-8 border-4 border-indigo-400 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
