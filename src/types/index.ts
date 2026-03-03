export type Medicine = {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  category: string;
  requiresPrescription?: boolean;
};

export type CartItem = {
  medicine: Medicine;
  quantity: number;
};

export type OrderStatus = 'Pending' | 'Approved' | 'Delivered';

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
};

export type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
};
