export interface TravelRecord {
  id: string;
  date: string;
  title: string;
  status: 'pending' | 'completed' | 'freeze';
  price: number;
  rewards: number;
  imageUrl: string;
}

export interface User {
  name: string;
  referralCode: string;
  walletBalance: number;
  todaysRewards: number;
  dailyTravel: number;
  completedTravel: number;
}

export interface FundInfo {
  fullName: string;
  cryptoAddress: string;
  network: 'TRC20' | 'ERC20' | 'BTC';
  phoneNumber: string;
}