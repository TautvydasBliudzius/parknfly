import React from "react";
import NavBar from "../NavBar/NavBar";


interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  return (
    <div id="header">
        <NavBar/>
    </div>
  );
}

export default Header;
