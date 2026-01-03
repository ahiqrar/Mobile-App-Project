
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../AppContext';
import { Banquet } from '../../types';

const BanquetList: React.FC = () => {
  const { banquets } = useApp();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    price: 500000,
    capacity: 0,
    highlighted: false
  });

  const filteredBanquets = banquets.filter(b => 
    b.pricePerSlot <= filters.price && 
    b.capacity >= filters.capacity &&
    (!filters.highlighted || b.isHighlighted)
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Search Results</h2>
          <p className="text-gray-500">{filteredBanquets.length} venues found</p>
        </div>
        <button 
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
          Filters
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Highlighted ones first */}
        {filteredBanquets.sort((a,b) => (a.isHighlighted === b.isHighlighted ? 0 : a.isHighlighted ? -1 : 1)).map(banquet => (
          <Link to={`/banquet/${banquet.id}`} key={banquet.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
            <div className="relative h-48">
              <img src={banquet.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {banquet.isHighlighted && (
                <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  Featured
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold text-indigo-900">
                Rs. {banquet.pricePerSlot.toLocaleString()}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{banquet.name}</h3>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  {banquet.rating}
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {banquet.location}
              </div>
              <div className="mt-auto flex justify-between items-center text-sm border-t pt-4">
                <span className="text-gray-500">Max Capacity: <b className="text-gray-900">{banquet.capacity}</b></span>
                <span className="text-indigo-600 font-bold group-hover:underline">View Details →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Filter Modal Overlay */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-indigo-900">Refine Search</h3>
              <button onClick={() => setShowFilter(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">Max Price (Rs. {filters.price.toLocaleString()})</label>
                <input 
                  type="range" min="0" max="1000000" step="10000" 
                  value={filters.price} 
                  onChange={(e) => setFilters({...filters, price: parseInt(e.target.value)})}
                  className="w-full accent-indigo-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">Minimum Capacity</label>
                <div className="flex gap-2">
                  {[0, 100, 300, 500, 1000].map(cap => (
                    <button 
                      key={cap}
                      onClick={() => setFilters({...filters, capacity: cap})}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium border ${filters.capacity === cap ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                    >
                      {cap}+
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">Show Featured Only</span>
                <button 
                  onClick={() => setFilters({...filters, highlighted: !filters.highlighted})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${filters.highlighted ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${filters.highlighted ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <button 
                onClick={() => setShowFilter(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BanquetList;
