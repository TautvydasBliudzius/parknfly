import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-scroll';
import logo from '../../images/parkandflylogo.png'

const NavBar: React.FC = () => {
  const [navHeight, setNavHeight] = useState<number>(0);
  const [isNavOpen, setNavOpen] = useState<boolean>(false)
  const navRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      const height = nav.offsetHeight;
      setNavHeight(height);
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    if ((navRef.current && !navRef.current.contains(event.target as Node))) {
      setNavOpen(false);
    }
  };

  return (
    <div>
      <nav className='navContainer'>
        <Link
          to='reservation'
          className='logo'
          smooth={true}
          duration={1000}
          offset={-navHeight}
        >
          <img src={logo} alt="logo" />
        </Link>
        <input type="checkbox" className="menu-btn" id="menu-btn" />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='nav-icon'></span>
        </label>
        <ul className={`menu ${isNavOpen ? 'open' : ''}`} ref={navRef}>
          <li><Link to='reservation' smooth={true} duration={1000} offset={-navHeight}>Rezervacija</Link></li>
          <li><Link to='howtofind' smooth={true} duration={1000} offset={-navHeight}>Kaip mus rasti?</Link></li>
          <li><Link to='howtouse' smooth={true} duration={1000} offset={-navHeight}>Kaip naudotis?</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
