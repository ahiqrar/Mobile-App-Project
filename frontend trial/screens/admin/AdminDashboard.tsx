
import React from 'react';
import { useApp } from '../../AppContext';

const AdminDashboard: React.FC = () => {
  const { banquets, setBanquets } = useApp();

  const toggleHighlight = (id: string) => {
    setBanquets(prev => prev.map(b => b.id === id ? { ...b, isHighlighted: !b.isHighlighted } : b));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Control</h1>
          <p className="text-gray-500">System wide management of owners and halls</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">View Logs</button>
           <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100">Add Owner</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', value: 'Rs. 1.2M', icon: '📈', color: 'emerald' },
          { label: 'Active Owners', value: '48', icon: '👥', color: 'indigo' },
          { label: 'Unapproved Halls', value: '7', icon: '⚠️', color: 'rose' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-2xl`}>{stat.icon}</div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Manage Banquet Listings</h3>
          <div className="flex bg-gray-50 p-1 rounded-lg">
             <button className="px-4 py-1.5 text-xs font-bold bg-white rounded-md shadow-sm">All</button>
             <button className="px-4 py-1.5 text-xs font-bold text-gray-400">Featured</button>
             <button className="px-4 py-1.5 text-xs font-bold text-gray-400">Pending</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Banquet Details</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {banquets.map(b => (
                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <img src={b.images[0]} className="w-10 h-10 rounded-lg object-cover" />
                       <div>
                         <p className="text-sm font-bold text-gray-900">{b.name}</p>
                         <p className="text-[10px] text-gray-500">{b.location}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">Royal Group</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">Approved</span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleHighlight(b.id)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${b.isHighlighted ? 'bg-amber-400' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${b.isHighlighted ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                       <button className="text-indigo-600 hover:underline text-xs font-bold">Edit</button>
                       <button className="text-rose-600 hover:underline text-xs font-bold">Disable</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
