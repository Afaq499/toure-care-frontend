import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
  const rules = [
    "All Travel Packages must be Completed before Withdrawing or Resetting your account.",
    "Only One account can be registered One phone number.",
    "Please do not re-bind the same wallet address to different account. We will freeze the following accounts if found.",
    "Please do not disclose your account password and withdrawal password to others. Our platform is not responsible for any losses",
    "All travel packages deals are randomly allocated by the system and once the travel packages deal has been accepted and allocated by the system, any changes, cancellations or abandonment of travel packages are strictly not allowed.",
    "Legal action will be taken in the event of inappropriate use of the account.",
    "Kindly Re-confirm the deposit address with customer service before transferring funds.",
    "If the deposit is made to the wrong deposit address, the platform will not take any responsibility.",
    "A balance of less than $50 is not allowed to start travel packages deal, members should ensure that they have a balance of $50 before starting a booking deal.",
    "Once member has started a travel packages deal, it must be Completed within One day, if it cannot be completed within one day, please inform customer service as soon as possible.",
    "If get a premium package and don't complete it on the same day, the merchant may take a deduction of reputation points",
    "Every Premium packages Might Include 1 to 3 ticket of the Platform Merchant.",
    "Members will Reward One Premium Packages when members Upgraded Level Of Traveler.",
    "Members will not receive any profit when the account is having Negative amount.",
    "If you need to delete the account, please find a live agent to delete the account after completing the 40 journeys of the day",
    "Platform requires 40 journeys to be completed and have 100% reputation points before a withdrawal can be made",
    "In case of repeated delays, the merchant may penalize you. Losses incurred by the merchant as a result of your failure to submit complete journeys",
    "All members it is possible to get 2 to 3 premium packages in 30 journeys"
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold">Terms and Conditions</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-6">
          Dear member, kindly read carefully for our Rules Description, thank you for your cooperation.
        </p>

        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-start">
              <span className="text-blue-600 font-semibold mr-2">{index + 1}.</span>
              <p className="text-gray-700">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 