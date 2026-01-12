import banquet1 from "@/assets/banquet-1.jpg";
import banquet2 from "@/assets/banquet-2.jpg";
import banquet3 from "@/assets/banquet-3.jpg";
import banquet4 from "@/assets/banquet-4.jpg";

export interface Banquet {
  id: string;
  name: string;
  location: string;
  city: string;
  price: number;
  capacity: number;
  rating: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  availableSlots: ("morning" | "evening" | "night")[];
  isHighlighted: boolean;
  contactPhone: string;
  contactEmail: string;
}

export const banquets: Banquet[] = [
  {
    id: "1",
    name: "Royal Palace Banquet",
    location: "DHA Phase 6",
    city: "Karachi",
    price: 250000,
    capacity: 500,
    rating: 4.8,
    image: banquet1,
    images: [banquet1, banquet2, banquet3],
    description: "Experience the grandeur of royalty at our luxurious palace banquet. Featuring crystal chandeliers, marble flooring, and impeccable service that will make your special day truly unforgettable.",
    amenities: ["AC Hall", "Stage", "Parking", "Catering", "Photography", "Decoration", "Sound System", "Valet"],
    availableSlots: ["morning", "evening", "night"],
    isHighlighted: true,
    contactPhone: "+92 300 1234567",
    contactEmail: "info@royalpalace.pk",
  },
  {
    id: "2",
    name: "Grand Celebration Hall",
    location: "Gulshan-e-Iqbal",
    city: "Karachi",
    price: 180000,
    capacity: 350,
    rating: 4.5,
    image: banquet2,
    images: [banquet2, banquet1, banquet4],
    description: "A modern venue with contemporary design and state-of-the-art facilities. Perfect for corporate events, weddings, and grand celebrations.",
    amenities: ["AC Hall", "Stage", "Parking", "Sound System", "LED Screens"],
    availableSlots: ["evening", "night"],
    isHighlighted: false,
    contactPhone: "+92 321 7654321",
    contactEmail: "book@grandcelebration.pk",
  },
  {
    id: "3",
    name: "Garden Paradise Venue",
    location: "Bahria Town",
    city: "Lahore",
    price: 320000,
    capacity: 800,
    rating: 4.9,
    image: banquet3,
    images: [banquet3, banquet1, banquet2],
    description: "An enchanting outdoor garden venue with fairy lights, beautiful landscaping, and romantic evening ambiance. Ideal for fairy-tale weddings.",
    amenities: ["Outdoor Setup", "Tent", "Parking", "Catering", "Photography", "Decoration", "Generator Backup"],
    availableSlots: ["evening", "night"],
    isHighlighted: true,
    contactPhone: "+92 333 9876543",
    contactEmail: "events@gardenparadise.pk",
  },
  {
    id: "4",
    name: "Elite Marquee",
    location: "Model Town",
    city: "Lahore",
    price: 150000,
    capacity: 250,
    rating: 4.3,
    image: banquet4,
    images: [banquet4, banquet2, banquet3],
    description: "An intimate and cozy venue perfect for smaller gatherings. Features warm golden lighting and sophisticated décor.",
    amenities: ["AC Hall", "Stage", "Parking", "Sound System"],
    availableSlots: ["morning", "evening"],
    isHighlighted: false,
    contactPhone: "+92 345 1112222",
    contactEmail: "reserve@elitemarquee.pk",
  },
  {
    id: "5",
    name: "Pearl Continental Banquet",
    location: "Mall Road",
    city: "Lahore",
    price: 450000,
    capacity: 600,
    rating: 4.9,
    image: banquet1,
    images: [banquet1, banquet4, banquet2],
    description: "Five-star luxury at its finest. Experience world-class hospitality with premium amenities and exquisite cuisine.",
    amenities: ["AC Hall", "Stage", "Parking", "Catering", "Photography", "Decoration", "Sound System", "Valet", "Bridal Suite"],
    availableSlots: ["morning", "evening", "night"],
    isHighlighted: true,
    contactPhone: "+92 300 5556666",
    contactEmail: "banquets@pc.pk",
  },
  {
    id: "6",
    name: "Sunset View Hall",
    location: "F-10 Markaz",
    city: "Islamabad",
    price: 200000,
    capacity: 300,
    rating: 4.6,
    image: banquet2,
    images: [banquet2, banquet3, banquet1],
    description: "Stunning panoramic views of the Margalla Hills. A modern venue with floor-to-ceiling windows and elegant interiors.",
    amenities: ["AC Hall", "Stage", "Parking", "Sound System", "Terrace"],
    availableSlots: ["evening", "night"],
    isHighlighted: false,
    contactPhone: "+92 311 4445555",
    contactEmail: "info@sunsetview.pk",
  },
];

export const cities = ["All Cities", "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"];

export const timeSlots = [
  { id: "morning", label: "Morning", time: "9:00 AM - 2:00 PM" },
  { id: "evening", label: "Evening", time: "3:00 PM - 8:00 PM" },
  { id: "night", label: "Night", time: "9:00 PM - 2:00 AM" },
] as const;

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
