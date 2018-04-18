import React from 'react';
import { Link } from 'react-router-dom';
import HeaderStyled from './Header.style';

const Header = () => (
  <HeaderStyled>
    <ul>
      <li>
        <Link to="/">Calendar</Link>
      </li>
      <li>
        <Link to="/other">Other</Link>
      </li>
    </ul>
  </HeaderStyled>
);

export default Header;
