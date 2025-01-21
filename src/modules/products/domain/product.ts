export interface Product {
  id: number;
  name: string;
  description: string;
  seller_id: number;
}

export interface ProductCreate {
  name: string;
  description: string;
}
