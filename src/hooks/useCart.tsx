import { CartContext, CartContextData } from 'context/CartContext';
import { useContext } from 'react';

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
