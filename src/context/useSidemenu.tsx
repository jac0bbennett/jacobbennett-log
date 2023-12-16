'use client';

import { createContext, useContext, useState } from 'react';

export const SidemenuContext = createContext({
  isOpen: false,
  toggleSidemenu: () => {},
  setOpen: (isOpen: boolean) => {},
});

export const SidemenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidemenu = () => {
    setIsOpen(!isOpen);
  };

  const setOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <SidemenuContext.Provider value={{ isOpen, toggleSidemenu, setOpen }}>
      {children}
    </SidemenuContext.Provider>
  );
};

export const useSidemenu = () => useContext(SidemenuContext);
