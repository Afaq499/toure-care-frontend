import React, { useState } from 'react';
import { travelRecords } from '../data/mockData';
import TravelCard from '../components/TravelCard';
import { TravelRecord } from '../types';

type FilterType = 'all' | 'pending' | 'completed' | 'freeze';

const TravelHistory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredRecords = travelRecords.filter(record => {
    if (activeFilter === 'all') return true;
    return record.status === activeFilter;
  });

  return (
    <div className="p-4">
      <div className="text-sm text-gray-500 mb-4">
        {travelRecords.length} Records
      </div>
      
      <div className="flex mb-6 border-b">
        <button
          className={`pb-2 px-3 ${activeFilter === 'all' ? 'border-b-2 border-orange-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button
          className={`pb-2 px-3 ${activeFilter === 'pending' ? 'border-b-2 border-orange-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`pb-2 px-3 ${activeFilter === 'completed' ? 'border-b-2 border-orange-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`pb-2 px-3 ${activeFilter === 'freeze' ? 'border-b-2 border-orange-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveFilter('freeze')}
        >
          Freeze
        </button>
      </div>
      
      <div>
        {filteredRecords.map((record: TravelRecord) => (
          <TravelCard key={record.id} travel={record} />
        ))}
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No travel records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelHistory;