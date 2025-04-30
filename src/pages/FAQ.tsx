import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FAQ: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold">FAQs</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-600 font-semibold">
            ⚠️ Notice: Please DO NOT bind the same wallet info for different accounts, if it is detected by the system the account ID will be frozen.⚠️
          </p>
          <p className="text-gray-700 mt-2">
            Personal multi-account accepting data will lead to the suspension of the merchant's store, affecting the merchant's credibility and the invalidation of sales data. The platform prohibits the same bank card bounded to multiple accounts, please DO NOT use individual multi-account, a card bound to multiple accounts, will all be lead to funds freeze up to 180 days or account permanently blocked for future processing! The platform is designed to prevent people from maliciously money laundering or cashing out a series of improper behavior.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Frequently asked questions (FAQ)</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-blue-600">1. Recharge process</h3>
              <p className="text-gray-700 mt-2">
                To recharge, you only required to recharge within the home page. The followings steps is the recharge process:
              </p>
              <ol className="list-decimal list-inside mt-2 space-y-2 text-gray-700">
                <li>Click on the "Recharge" button</li>
                <li>Fill in the corresponding amount to be transferred and click on the "Recharge" button to redirect to the online recharge customer service to assist in remittance recharge.</li>
                <li>After remitting the money according to the account provided by the platform's customer service, make sure to submit a screenshot of the successful transfer to the account.</li>
              </ol>
              <p className="text-gray-700 mt-2">
                In order to ensure that the recharge is made quickly, please make sure that the name of the person and the amount you are transferring are the same as the one being provided. If you encounter any unsolvable problems during the recharge process, please contact the customer service recharge department in time. Due to the large amount of information, please make sure to confirm the account card number of this platform carefully before recharging. The platform occasionally changes the account number.
                If you have any questions, please click the platform online customer service for consulting.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-600">2. Reservation</h3>
              <p className="text-gray-700">
                After completing your personal information. After you recharged your account, you may start reservation, click "Deal Now" to redirect to the relevant page to "Booking Now". Patiently wait for the system to book an order, submit the order once submission pop up to complete the tasks. Complete 35(Normal promoter) submissions per day to perform withdrawal.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-600">3. Withdrawal</h3>
              <p className="text-gray-700">
                Before making a withdrawal, please bind your withdrawal information in the APP. Before proceed, the withdrawal agents must complete the 35(Normal promoter) submissions requirement. During the working hours of the platform, you can withdraw your money in home page's "Withdrawal" interface. Click the "Withdrawal" button after entering the amount you want to withdraw and enter your withdraw password to withdraw. The specific arrival time is subject to the bank.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-600">4. Platform agent mode</h3>
              <p className="text-gray-700">
                Platform users can become platform agents by recommending new members, and they can get extra dynamic rewards. The reward is 30% of the daily commission for direct inferior users.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-600">5. Submission Time</h3>
              <p className="text-gray-700">
                The platform operates from 11:00 to 23:00 daily and users can accept data during the platform's operating hours.
              </p>
            </div>
          </div>

          <p className="text-gray-600 italic mt-4">
            Note: For any further clarification, please contact our online customer service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 