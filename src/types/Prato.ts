export type Prato = {
  products: any;
  title: string
  description: string
  photo: string
  size: number
  serving: number
  price: number
  id: number
  categoryId: number
  stock: number
  amount?: number
  subTotal?: number
};

export type Cardapio = Prato[];