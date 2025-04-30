import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
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
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  taskId,
  userId,
  userBalance,
  productPrice,
  isEdit
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hover, setHover] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isEdit && userBalance < productPrice) {
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

  const balanceDifference = productPrice - userBalance;
  const hasInsufficientBalance = isEdit && userBalance < productPrice;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Submit Task</h2>
        
        {hasInsufficientBalance ? (
          <div className="mb-4">
            <p className="text-red-500 font-medium">
              Insufficient Balance
            </p>
            <p className="text-gray-600 mt-2">
              You need {balanceDifference.toFixed(2)} USDT more to complete this task.
            </p>
          </div>
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