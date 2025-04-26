import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitTask } from '../store/slices/taskSubmissionSlice';
import { toast } from 'react-hot-toast';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, taskId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hover, setHover] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!review.trim()) {
      toast.error('Please write a review');
      return;
    }

    try {
      await dispatch(submitTask({ taskId, rating, review })).unwrap();
      toast.success('Review submitted successfully!');
      onClose();
    } catch (error) {
      // Error is already handled by the thunk
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Rate Your Experience</h2>
        
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <button
                key={index}
                className={`text-3xl mx-1 focus:outline-none ${
                  ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </button>
            );
          })}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
            Your Review
          </label>
          <textarea
            id="review"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal; 