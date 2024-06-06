import styles from './Prato.module.scss';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { useProduct } from 'hooks/useProduc';

const TagsPrato = lazy(() => import('components/TagsPrato'));
const NotFound = lazy(() => import('pages/NotFound'));
const PaginaPadrao = lazy(() => import('components/PaginaPadrao'));

export default function Prato() {
  const { products } = useProduct();
  const { id } = useParams();
  const navigate = useNavigate();
  const prato = products.find(item => item.id === Number(id));
  if (!prato) {
    return <NotFound />;
  }
  return (
    <Routes>
      <Route path="*" element={<PaginaPadrao />}>
        <Route index element={
          <>
            <button className={styles.voltar} onClick={() => navigate(-1)}>
              {'< Voltar'}
            </button>
            <section className={styles.container}>
              <h1 className={styles.titulo}>
                {prato.title}
              </h1>
              <div className={styles.imagem}>
                <img src={prato.photo} alt={prato.title} />
              </div>
              <div className={styles.conteudo}>
                <p className={styles.conteudo__descricao}>
                  {prato.description}
                </p>
                <TagsPrato {...prato} />
              </div>
            </section>
          </>
        } />
      </Route>
    </Routes>
  );
}