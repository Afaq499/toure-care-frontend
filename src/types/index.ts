export interface TravelRecord {
  id: string;
  date: string;
  title: string;
  status: 'pending' | 'completed' | 'freeze';
  price: number;
  rewards: number;
  imageUrl: string;
  isEdit?: boolean;
  canSubmit?: boolean;
}

export interface User {
  _id: string;
  username: string;
  phoneNumber: string;
  name?: string;
  referralCode?: string;
  walletBalance?: number;
  todaysRewards?: number;
  dailyTravel?: number;
  completedTravel?: number;
  balance?: number;
  todaysEarnings?: number;
  totalEarnings?: number;
  taskStats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
  };
}

export interface FundInfo {
  fullName: string;
  cryptoAddress: string;
  network: 'TRC20' | 'ERC20' | 'BTC';
  phoneNumber: string;
}