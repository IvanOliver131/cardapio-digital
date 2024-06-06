import Footer from 'components/Footer';
import Menu from 'components/Menu';
import Admin from 'pages/Admin';
import Checkout from 'pages/Checkout';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Cardapio = lazy(() => import('pages/Cardapio'));
const PaginaPadrao = lazy(() => import('components/PaginaPadrao'));
const Inicio = lazy(() => import('pages/Inicio'));
const NotFound = lazy(() => import('pages/NotFound'));
const Prato = lazy(() => import('pages/Prato'));

export default function AppRouter() {
  return (
    <main className='container'>
      <Router>
        <Menu />
        <Suspense fallback={<p> Carregando... </p>}>
          <Routes>
            <Route path='/' element={<PaginaPadrao />}>
              <Route index element={<Inicio />} />
              <Route path='cardapio' element={<Cardapio />} />
            </Route>
            <Route path='prato/:id' element={<Prato />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </main>
  );
}