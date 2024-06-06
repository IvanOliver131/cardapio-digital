import { useState } from 'react';
import { MdDelete, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useCart } from 'hooks/useCart';
import { formatPrice } from 'utils/format';
import { Prato } from 'types/Prato';
import { useNavigate } from 'react-router-dom';
import cardapio from 'data/cardapio.json';
import styles from './Checkout.module.scss';
import { toast } from 'react-toastify';
import { api } from 'services/api';

export default function Checkout() {
  const { cart, removeProduct, updateProductAmount, clearCart } = useCart();
  const [observations, setObservations] = useState('');
  const navigate = useNavigate();

  const cartFormatted = cart.map((product) => ({
    ...product,
    subTotal: product.price * (product.amount || 0),
    priceFormatted: formatPrice(product.price)
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product: Prato) => {
      return sumTotal + (product.price * (product.amount || 0));
    }, 0)
  );

  function handleProductIncrement(product: Prato) {
    const productId = product.id;
    const amount = (product.amount || 0) + 1;
    updateProductAmount({ productId, amount });
  }

  function handleProductDecrement(product: Prato) {
    const productId = product.id;
    const amount = (product.amount || 0) - 1;
    updateProductAmount({ productId, amount });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  async function handleCheckout() {
    const order = {
      cart: cartFormatted,
      total,
      status: 'pending',
      createdAt: new Date(),
      observations
    };

    // Salvar no localStorage
    localStorage.setItem('checkoutOrder', JSON.stringify(order));

    await api.post('/orders', order);

    // Atualizar estoque no JSON
    const updatedStock = cardapio.map((item) => {
      const cartItem = cart.find((product) => product.id === item.id);
      if (cartItem) {
        return { ...item, stock: item.stock - (cartItem.amount || 0) };
      }
      return item;
    });

    // Atualizar estoque no localStorage (somente para demonstração)
    localStorage.setItem('updatedStock', JSON.stringify(updatedStock));

    // Limpar o localStorage
    clearCart();

    // Exibir mensagem de sucesso
    toast.success('Seu pedido foi anotado e será entregue assim que possível');

    // Redirecionar para a página inicial após um pequeno atraso
    navigate('/');
  }

  return (
    <>
      {cart.length > 0 ?
        (<section className={styles.checkout}>
          <table className={styles.checkout_checkoutTable}>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Subtotal</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {cartFormatted.map((product) => (
                <tr key={product.id} data-testid="product">
                  <td>
                    <img src={product.photo} alt={product.title} className={styles.checkout_productImage} />
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>
                  </td>
                  <td>
                    <div className={styles.checkout_quantityControl}>
                      <button
                        type="button"
                        data-testid="decrement-product"
                        disabled={(product.amount || 0) <= 1}
                        onClick={() => handleProductDecrement(product)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={product.amount}
                      />
                      <button
                        type="button"
                        data-testid="increment-product"
                        onClick={() => handleProductIncrement(product)}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{formatPrice(product.subTotal)}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <section>
            <h4>Observações</h4>
            <textarea
              onChange={(event) => setObservations(event.target.value)}
              value={observations}
            />
          </section>

          <footer className={styles.checkout_Footer}>
            <button type="button" className={styles.checkout_checkoutButton} onClick={handleCheckout}>Finalizar pedido</button>
            <div className={styles.checkout_total}>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </div>
          </footer>
        </section>) :
        (<h2>Nenhum item no carrinho</h2>)
      }
    </>
  );
}
