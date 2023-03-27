'use client';

import React from 'react';
import { useSidemenu } from '../../context/useSidemenu';

const Hamburger = () => {
  const sidemenu = useSidemenu();

  return (
    <div className="hamcontainer" onClick={sidemenu.toggleSidemenu}>
      <div className="bar1" />
      <div className="bar2" />
      <div className="bar3" />
    </div>
  );
};

export default Hamburger;
