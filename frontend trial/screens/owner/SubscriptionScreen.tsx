
import React from 'react';

const SubscriptionScreen: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-indigo-900 mb-4">Grow Your Business</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Choose a plan that fits your needs. Reach thousands of customers looking for premium event spaces.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Basic Plan */}
        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl flex flex-col">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Basic Plan</h3>
            <p className="text-gray-500 mt-2 text-sm">Ideal for small local venues</p>
          </div>
          <div className="mb-8">
            <span className="text-5xl font-black text-indigo-900">Rs. 2,000</span>
            <span className="text-gray-400 font-bold">/month</span>
          </div>
          <ul className="space-y-4 mb-12 flex-1">
            {[
              'List up to 2 halls',
              'Basic analytics',
              'Online booking management',
              'Standard support',
              'Customer reviews access'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full bg-gray-50 text-gray-900 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all border border-gray-200">Current Plan</button>
        </div>

        {/* Featured Plan */}
        <div className="bg-indigo-900 rounded-[40px] p-10 shadow-2xl relative overflow-hidden flex flex-col text-white">
          <div className="absolute top-0 right-0 p-4">
             <div className="bg-amber-400 text-amber-900 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Most Popular</div>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold">Featured Elite</h3>
            <p className="text-indigo-200 mt-2 text-sm">Max visibility, max bookings</p>
          </div>
          <div className="mb-8">
            <span className="text-5xl font-black">Rs. 5,000</span>
            <span className="text-indigo-400 font-bold">/month</span>
          </div>
          <ul className="space-y-4 mb-12 flex-1">
            {[
              'Unlimited hall listings',
              'Top priority in search results',
              '"Featured" badge on listings',
              'Advanced visitor analytics',
              'Dedicated account manager',
              'Home page placement'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-indigo-100 font-medium">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full bg-white text-indigo-900 font-black py-5 rounded-2xl hover:bg-indigo-50 transition-all shadow-xl shadow-black/20">Upgrade Now</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
