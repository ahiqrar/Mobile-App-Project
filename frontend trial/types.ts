
export type Role = 'user' | 'owner' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Banquet {
  id: string;
  ownerId: string;
  name: string;
  location: string;
  capacity: number;
  pricePerSlot: number;
  description: string;
  rating: number;
  isHighlighted: boolean;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
}

export type TimeSlot = 'Morning' | 'Evening' | 'Night';

export interface Booking {
  id: string;
  banquetId: string;
  userId: string;
  date: string;
  timeSlot: TimeSlot;
  status: 'Pending' | 'Approved' | 'Rejected';
  totalPrice: number;
}

export interface Availability {
  banquetId: string;
  date: string;
  slot: TimeSlot;
  isBooked: boolean;
}
