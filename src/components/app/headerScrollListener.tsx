'use client';

import { useEffect } from 'react';

const HeaderScrollListener = (e: Event) => {
  const fixedHeader = document.getElementById('fixed-header');
  if (fixedHeader === null) return;

  const headerHeight = document.getElementById('header')?.clientHeight ?? 0;

  fixedHeader.style.transition = '150ms ease-in-out';

  if (window.scrollY >= headerHeight) {
    fixedHeader.classList.add('scrolled-fixed-header');
  } else {
    fixedHeader.classList.remove('scrolled-fixed-header');
  }
};

const HeaderScrollListenerElement = () => {
  useEffect(() => {
    window.addEventListener('scroll', HeaderScrollListener);
  }, []);

  return <></>;
};

export default HeaderScrollListenerElement;
