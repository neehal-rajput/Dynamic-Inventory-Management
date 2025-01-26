import { InventoryItem } from './types';

export const initialItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    quantity: 15,
    price: 999.99,
    description: 'High-performance laptop'
  },
  {
    id: '2',
    name: 'Desk Chair',
    category: 'Furniture',
    quantity: 8,
    price: 199.99,
    description: 'Ergonomic office chair'
  },
  {
    id: '3',
    name: 'Coffee Maker',
    category: 'Appliances',
    quantity: 20,
    price: 79.99,
    description: 'Automatic drip coffee maker'
  }
];