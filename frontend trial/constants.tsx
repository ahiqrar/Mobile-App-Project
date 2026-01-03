
import { Banquet, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', email: 'user@test.com', name: 'John Doe', role: 'user' },
  { id: 'o1', email: 'owner@test.com', name: 'Royal Halls', role: 'owner' },
  { id: 'a1', email: 'admin@test.com', name: 'System Admin', role: 'admin' },
];

export const MOCK_BANQUETS: Banquet[] = [
  {
    id: 'b1',
    ownerId: 'o1',
    name: 'Grand Royal Plaza',
    location: 'Karachi, Clifton',
    capacity: 500,
    pricePerSlot: 150000,
    description: 'A luxurious hall with gold plating and premium services for your special day.',
    rating: 4.8,
    isHighlighted: true,
    images: ['https://picsum.photos/seed/banquet1/800/400', 'https://picsum.photos/seed/banquet2/800/400'],
    status: 'approved'
  },
  {
    id: 'b2',
    ownerId: 'o1',
    name: 'Serene Gardens',
    location: 'Lahore, Gulberg',
    capacity: 300,
    pricePerSlot: 80000,
    description: 'An open-air garden banquet with natural beauty and elegant decor.',
    rating: 4.5,
    isHighlighted: false,
    images: ['https://picsum.photos/seed/garden1/800/400'],
    status: 'approved'
  },
  {
    id: 'b3',
    ownerId: 'o1',
    name: 'Crystal Palace',
    location: 'Islamabad, F-7',
    capacity: 800,
    pricePerSlot: 250000,
    description: 'Elite crystal themed banquet hall with centralized AC and massive parking.',
    rating: 4.9,
    isHighlighted: true,
    images: ['https://picsum.photos/seed/crystal/800/400'],
    status: 'approved'
  }
];
