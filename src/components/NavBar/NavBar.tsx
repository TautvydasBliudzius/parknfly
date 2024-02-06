import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import logo from '../../images/parkandflylogo.png'

const NavBar: React.FC = () => {
  const [navHeight, setNavHeight] = useState<number>(0);

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      const height = nav.offsetHeight;
      setNavHeight(height);
    }
  }, []);

  return (
    <div>
      <nav className='navContainer'>
        <Link
          to='reservation'
          className='logo'
          smooth={true}
          duration={1000}
          offset={-navHeight} // Offset by navbar height
        >
          <img src={logo} alt="logo" />
        </Link>
        <input type="checkbox" className="menu-btn" id="menu-btn" />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='nav-icon'></span>
        </label>
        <ul className='menu'>
          <li><Link to='reservation' smooth={true} duration={1000} offset={-navHeight}>Reservation</Link></li>
          <li><Link to='howtofind' smooth={true} duration={1000} offset={-navHeight}>How to find us</Link></li>
          <li><Link to='contacts' smooth={true} duration={1000} offset={-navHeight}>Contacts</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
