import classNames from 'classnames';
import { Prato } from 'types/Prato';
import styles from './TagsPrato.module.scss';
import filtros from '../../pages/Cardapio/Filtros/filtros.json';

export default function TagsPrato({
  categoryId,
  size,
  serving,
  price
}: Prato) {
  const filtro = filtros.find((category) => category.id === categoryId) || filtros[0];

  return (
    <div className={styles.tags}>
      <div className={classNames({
        [styles.tags__tipo]: true,
        [styles[`tags__tipo__${filtro.label.toLowerCase() === 'porções' ? 'porcoes' : filtro.label.toLowerCase()}`]]: true
      })}>{filtro.label}</div>
      <div className={styles.tags__porcao}>{size}g</div>
      <div className={styles.tags__qtdpessoas}>{serving} 2 pessoa{serving === 1 ? '' : 's'}</div>
      <div className={styles.tags__valor}>R$ {price.toFixed(2)}</div>
    </div>
  );
}