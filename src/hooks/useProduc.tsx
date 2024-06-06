import { ProductsContext, ProductsContextData } from 'context/ProductsContext';
import { useContext } from 'react';

export function useProduct(): ProductsContextData {
  const context = useContext(ProductsContext);

  return context;
}
