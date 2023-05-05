'use client';

import Link from 'next/link';
import { useSidemenu } from '../../context/useSidemenu';

const SideMenu = () => {
  const sidemenu = useSidemenu();

  return (
    <div className="sidemenu" style={sidemenu.isOpen ? { right: '0px' } : {}}>
      <div className="flex justify-between items-center w-11/12 m-auto">
        <div
          className="exit cursor-pointer"
          onClick={() => {
            sidemenu.setOpen(false);
          }}
        >
          <div className="bar1" />
          <div className="bar2" />
        </div>
        <span className="menu-title">Menu</span>
      </div>

      <div className="nav">
        <Link href="/">Log Home</Link>
        <Link href="//jacobbennett.us/#portfolio">Projects</Link>
      </div>
    </div>
  );
};

export default SideMenu;
