export type Trip = {
  id: string;
  userId: string;
  driverId: string;
  status: string;
  from: string;
  to: string;
  date: string;
  time: string;
  duration: string;
  distance: string;
  price: number;
  rideType: string;
  paymentMethod: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  // tu backend NO manda driver ni vehicle todavía
  driver?: { name: string; rating: number; avatar: string } | null;
  vehicleId: string;
};


export type Driver = {
  id: string;
  name: string;
  vehicleId: string;
  rating: number;
  isAvailable: boolean;
  totalTrips: number;
};
