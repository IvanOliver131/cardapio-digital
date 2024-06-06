import { useEffect, useState } from 'react';
import { api } from 'services/api';

export default function Admin() {
  const [orders, setOrders] = useState<any>([]);

  async function getOrders() {
    const { data } = await api.get('/orders');

    setOrders(data.orders);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h1>Lista de Pedidos</h1>
      {orders.map((order: any) => (
        <div key={order.id}>
          <h2>Pedido #{order.id}</h2>
          <p>Total: {order.total}</p>
          <p>Status: {order.status}</p>
          <p>Observações: {order.observations}</p>
          <h3>Itens do Carrinho:</h3>
          <ul>
            {order.cart.map((cartItem: any) => (
              <li key={cartItem.id}>
                <h4>{cartItem.product.title}</h4>
                <p>Quantidade: {cartItem.quantity}</p>
                <p>Preço Unitário: {cartItem.product.price}</p>
                <p>Total: {cartItem.quantity * cartItem.product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}