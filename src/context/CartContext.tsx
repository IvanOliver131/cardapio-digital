import { createContext, ReactNode, useState } from 'react';

import { Prato } from 'types/Prato';

import { toast } from 'react-toastify';
import { api } from 'services/api';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

export interface CartContextData {
  cart: Prato[];
  addProduct: (productId: number) => void;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  clearCart: () => void
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Prato[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      const { data } = await api.get(`/products/${productId}`);

      const stockAmount = data.product.stock || 0;
      const currentAmount = productExists ? productExists.stock : 0;
      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      if (productExists) {
        productExists.stock = amount;
      } else {
        const { data } = await api.get(`/products/${productId}`);

        const newProduct = {
          ...data.product,
          amount: 1
        };

        updatedCart.push(newProduct as Prato);
      }

      setCart(updatedCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      toast.success('Produto adicionado ao carrinho');
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find((product) => product.id === productId);
      let newUpdatedCart: Prato[] = [];

      if (productExists) {
        newUpdatedCart = updatedCart.filter((product) => product.id !== productId);
      } else {
        throw Error();
      }

      setCart(newUpdatedCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newUpdatedCart));
    } catch {
      return toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return;
      }
      const { data } = await api.get(`/products/${productId}`);
      const stockAmount = data.product.stock || 0;


      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find((product) => product.id === productId);

      if (productExists) {
        productExists.amount = amount;
        setCart(updatedCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      } else {
        throw Error();
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  const clearCart = () => {
    localStorage.removeItem('@RocketShoes:cart');
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
