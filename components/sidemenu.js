import Link from "next/link";

const Sidemenu = props => {
  return (
    <div
      className="sidemenu"
      style={props.page.state.navOpen ? { right: "0px" } : {}}
    >
      <div
        className="exit"
        onClick={() => {
          props.page.setNavOpen(false);
        }}
      >
        <div className="bar1" />
        <div className="bar2" />
      </div>
      <span className="menu-title">Menu</span>

      <div className="nav">
        <Link href="/">
          <a>Log Home</a>
        </Link>
        <a href="//jacobbennett.us/#portfolio">Portfolio</a>
        <a href="//jacobbennett.us//#about">About</a>
        <a href="//jacobbennett.us//#contact">Contact</a>
      </div>
    </div>
  );
};

export default Sidemenu;
