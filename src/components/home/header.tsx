'use client';

import { useEffect, useState } from 'react';

const HomeHeader = (props: { name: string }) => {
  const [offset, setOffset] = useState(0);

  const scrollListener = (e: Event) => {
    setOffset(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const calcTitleOffset = () => {
    const eq = -10 + offset / 15;
    return eq < 30 ? (offset === 0 ? '-10%' : eq.toString() + '%') : '30%';
  };

  const calcArrowOffset = () => {
    const eq = 10 - offset / 80;
    return eq > 5 ? (offset === 0 ? '10%' : eq.toString() + '%') : '5%';
  };

  return (
    <>
      <div id="header" style={{ minHeight: '100vh', justifyContent: 'center' }}>
        <div
          className="post-title home-title"
          style={{
            marginTop: calcTitleOffset(),
          }}
        >
          {props.name}&apos;s Log
        </div>

        <div
          className="downarrow"
          style={{
            bottom: calcArrowOffset(),
          }}
        >
          &#8595;
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
