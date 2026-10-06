import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Scroll to the top for new route navigation.
    // Preserve the browser-restored position for Back/Forward navigation.
    if (navigationType !== 'POP') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname, navigationType]);

  return null;
}
