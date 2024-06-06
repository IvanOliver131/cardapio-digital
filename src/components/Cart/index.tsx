import { Link } from 'react-router-dom';
import styles from './Cart.module.scss';

import { MdShoppingCart } from 'react-icons/md';

export default function Cart() {
  return (
    <Link className={styles.cart} to={'/checkout'}>
      <MdShoppingCart size={26} color='white' />
    </Link>
  );
}