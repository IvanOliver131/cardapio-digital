import styles from './Item.module.scss';
import { Prato } from 'types/Prato';
import TagsPrato from 'components/TagsPrato';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useCart } from 'hooks/useCart';

function Item(props: Prato) {
  const { id, title, description, photo } = props;
  const navigate = useNavigate();

  const { addProduct } = useCart();

  return (
    <div>
      <div className={styles.item} onClick={() => navigate(`/prato/${id}`)}>
        <div className={styles.item__imagem}>
          <img src={photo} alt={title} />
        </div>
        <div className={styles.item__descricao}>
          <div className={styles.item__titulo}>
            <h2> {title} </h2>
            <p> {description} </p>
          </div>
          <TagsPrato {...props} />
        </div>
      </div>
      <button type="button" className={styles.item_adicionar} onClick={() => addProduct(id)}>Adicionar ao carrinho</button>
    </div>
  );
}

export default memo(Item);