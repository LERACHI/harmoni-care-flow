// src/hooks/useScrollToTop.ts (ou .tsx)

import { useEffect } from 'react';
// Importa o hook 'useLocation' do seu roteador (geralmente react-router-dom)
import { useLocation } from 'react-router-dom'; 

const useScrollToTop = () => {
  // Pega o objeto de localização da rota atual
  const { pathname } = useLocation();

  useEffect(() => {
    // Rola para a posição (0, 0) sempre que o 'pathname' (a URL) mudar.
    // 'window.scrollTo(0, 0)' é o mesmo que rolar para o topo instantaneamente.
    window.scrollTo(0, 0);
  }, [pathname]); // O array de dependências garante que a função rode a cada mudança de rota

  return null; // O hook não retorna nada que precise ser renderizado
};

export default useScrollToTop;