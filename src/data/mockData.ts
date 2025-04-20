import { TravelRecord, User } from '../types';

export const userData: User = {
  name: 'Shiba',
  referralCode: 'K57SZX',
  walletBalance: 253.46,
  todaysRewards: 16.20,
  dailyTravel: 40,
  completedTravel: 9
};

export const travelRecords: TravelRecord[] = [
  {
    id: '1',
    date: '2025-04-20 00:42:24',
    title: 'Discover Abu Dabbab',
    status: 'pending',
    price: 369.00,
    rewards: 1.80,
    imageUrl: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    date: '2025-04-20 00:39:50',
    title: 'Tours To Gothenburg',
    status: 'completed',
    price: 399.00,
    rewards: 2.00,
    imageUrl: 'https://images.pexels.com/photos/13985154/pexels-photo-13985154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    date: '2025-04-20 00:38:40',
    title: 'Tours In CHACHAPOYAS',
    status: 'completed',
    price: 309.00,
    rewards: 1.55,
    imageUrl: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    date: '2025-04-19 20:35:12',
    title: 'Phuket Adventure',
    status: 'freeze',
    price: 459.00,
    rewards: 2.30,
    imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];