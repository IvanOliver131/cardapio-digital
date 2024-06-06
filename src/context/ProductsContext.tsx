import { createContext, ReactNode, useEffect, useState } from 'react';
import filtros from '../pages/Cardapio/Filtros/filtros.json';

import { Prato } from 'types/Prato';

import { api } from 'services/api';

interface ProductsProviderProps {
  children: ReactNode;
}

export interface ProductsContextData {
  products: Prato[];
}

export const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps): JSX.Element {
  const [products, setProducts] = useState<Prato[]>([]);

  const getProducts = async () => {
    const { data } = await api.get('/products');

    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <ProductsContext.Provider
      value={{ products }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
