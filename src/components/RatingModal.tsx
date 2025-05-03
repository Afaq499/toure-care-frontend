import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { submitTask } from '../store/slices/taskSubmissionSlice';
import { fetchTravelHistory } from '../store/slices/travelHistorySlice';
import { getUser } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { AppDispatch } from '../store';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  userId: string;
  userBalance: number;
  productPrice: number;
  isEdit?: boolean;
  rewards: number;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  taskId,
  userId,
  userBalance,
  productPrice,
  isEdit,
  rewards
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hover, setHover] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pendingTasks, completedTasks } = useAppSelector((state) => state.travelHistory);

  const handleSubmit = async () => {
    if (userBalance < productPrice) {
      return; // Don't submit if insufficient balance
    }
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!review.trim()) {
      toast.error('Please write a review');
      return;
    }

    try {
      // First submit the task
      await dispatch(submitTask({ taskId, rating, review })).unwrap();
      
      // Then fetch the updated travel history
      await dispatch(fetchTravelHistory("undefined")).unwrap();
      
      // Fetch updated user information
      await dispatch(getUser()).unwrap();
      
      toast.success('Review submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to submit task:', error);
    }
  };

  const openSupportChat = () => {
    // @ts-ignore - Tawk_API is loaded from external script
    if (window.Tawk_API) {
      // @ts-ignore
      window.Tawk_API.toggle();
    }
    onClose();
  };

  if (!isOpen) return null;

  const balanceDifference = userBalance - productPrice;
  const hasInsufficientBalance = userBalance < productPrice;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-xl p-4 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          {
            hasInsufficientBalance && (
              <div className="mb-4 flex justify-between">
                <div className="text-xl font-bold text-gray-900">My Balance</div>
                <div className="text-xl font-bold text-gray-900">${balanceDifference.toFixed(2)}</div>
              </div>
            )
          }

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex flex-col items-center bg-gray-50 rounded-lg p-3">
                <span className="text-sm text-gray-600">Commission</span>
                <span className="font-semibold">${rewards.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center bg-gray-50 rounded-lg p-3">
                <span className="text-sm text-gray-600">Pending Trek</span>
                <span className="font-semibold">{pendingTasks}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center bg-gray-50 rounded-lg p-3">
                <span className="text-sm text-gray-600" style={{ width: '200px' }}>Trek Completed</span>
                <span className="font-semibold">{completedTasks}</span>
              </div>
            </div>
          </div>
        </div>

        {hasInsufficientBalance ? (null
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Review</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
              />
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          
          {hasInsufficientBalance ? (
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              onClick={openSupportChat}
            >
              Contact Support
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingModal; 