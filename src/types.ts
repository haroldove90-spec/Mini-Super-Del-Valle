export enum UserRole {
  ADMIN = 'Administrador',
  GERENTE = 'Gerente',
  CAJERO = 'Cajero'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Leche Entera 1L', price: 25.50, stock: 45, category: 'Lácteos', sku: 'L-001' },
  { id: '2', name: 'Pan Integral Grande', price: 38.00, stock: 12, category: 'Panadería', sku: 'P-002' },
  { id: '3', name: 'Refresco Cola 600ml', price: 18.50, stock: 80, category: 'Bebidas', sku: 'B-003' },
  { id: '4', name: 'Huevo (Dozena)', price: 42.00, stock: 20, category: 'Abarrotes', sku: 'H-004' },
  { id: '5', name: 'Papitas Saladas', price: 15.00, stock: 35, category: 'Snacks', sku: 'S-005' },
  { id: '6', name: 'Detergente Multiusos 1kg', price: 55.00, stock: 8, category: 'Limpieza', sku: 'L-006' },
  { id: '7', name: 'Aceite Vegetal 900ml', price: 48.00, stock: 15, category: 'Cocina', sku: 'C-007' },
  { id: '8', name: 'Arroz Blanco 1kg', price: 22.00, stock: 60, category: 'Abarrotes', sku: 'A-008' },
];

export const SALES_DATA = [
  { name: 'Lun', sales: 4200 },
  { name: 'Mar', sales: 3800 },
  { name: 'Mie', sales: 5100 },
  { name: 'Jue', sales: 4600 },
  { name: 'Vie', sales: 6200 },
  { name: 'Sab', sales: 8500 },
  { name: 'Dom', sales: 7100 },
];
