
export interface PropertyDetails {
  neighborhood: string;
  roomType: 'Entire home/apt' | 'Private room' | 'Shared room';
  accommodates: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  reviewScore: number;
}

export interface PredictionResult {
  estimatedPrice: number;
  confidenceScore: number;
  marketInsights: string;
  priceHistory: { month: string; price: number }[];
}

export const NEIGHBORHOODS = [
  "Manhattan - Upper West Side",
  "Brooklyn - Williamsburg",
  "Manhattan - Chelsea",
  "Brooklyn - Bushwick",
  "Queens - Astoria",
  "Manhattan - East Village"
];

export const ROOM_TYPES = [
  "Entire home/apt",
  "Private room",
  "Shared room"
];

export const AMENITIES_LIST = [
  "Wi-Fi", "Kitchen", "Air conditioning", "Pool", "Free parking",
  "Self check-in", "Workspace", "Pet friendly", "Washer/Dryer"
];
