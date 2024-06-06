import { ReactComponent as Logo } from 'assets/logo.svg';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import Cart from 'components/Cart';

export default function Menu() {
  const routes = [{
    label: 'Início',
    to: '/'
  }, {
    label: 'Cardápio',
    to: '/cardapio'
  }];

  return (
    <nav className={styles.menu}>
      <Logo />
      <ul className={styles.menu__list}>
        {routes.map((rota, index) => (
          <li key={index} className={styles.menu__link}>
            <Link to={rota.to}>
              {rota.label}
            </Link>
          </li>
        ))}
      </ul>
      <Cart />
    </nav>
  );
}