import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top ms-4 me-2"
          />
           Coin Tracker
        </a>
      </div>
    </nav>
  );
};

export default Header;
