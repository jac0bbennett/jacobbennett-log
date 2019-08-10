import React from "react";

const Hamburger = props => {
  return (
    <div
      className="hamcontainer"
      onClick={() => {
        props.setNavOpen(true);
      }}
    >
      <div className="bar1" />
      <div className="bar2" />
      <div className="bar3" />
    </div>
  );
};

export default Hamburger;
