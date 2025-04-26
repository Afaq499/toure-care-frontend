import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTravelHistory } from '../store/slices/travelHistorySlice';
import TravelCard from '../components/TravelCard';

type FilterType = 'all' | 'pending' | 'completed';

const TravelHistory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const dispatch = useAppDispatch();
  const { tasks, totalTasks, loading, error } = useAppSelector((state) => state.travelHistory);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchTravelHistory(user._id));
    }
  }, [dispatch, user]);

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    return task.status === activeFilter;
  });

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-sm text-gray-500 mb-4">
        {totalTasks} Records
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
      </div>
      
      <div>
        {filteredTasks.map((task) => (
          <TravelCard
            key={task._id}
            travel={{
              id: task._id,
              date: new Date(task.productId.createdAt).toLocaleString(),
              title: task.productId.name,
              status: task.status,
              price: task.productPrice,
              rewards: task.productPrice * 0.01, // Assuming 1% reward rate
              imageUrl: task.productId.image
            }}
          />
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No travel records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelHistory;