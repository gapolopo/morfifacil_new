import React from 'react';
import '../../styles/components/layout/Header.css';

document.title = "Morfi-Fácil - React";


const Header = (props) => {
  return (
    <header>
      <title>Morfi-Fácil</title>
      <div className="holder">
        <img src="images/morfifacil.png"  alt="MorfiFacil" />
      </div>
    </header>
  );
}

export default Header;
