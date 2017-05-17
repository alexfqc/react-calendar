import React from 'react';
import PropTypes from 'prop-types';
import { IndexLink, Link } from 'react-router';
import '../../scss/menu.scss';

const App = ({ children }) => (
  <div>
    <div className="menu-container">
      <ul className="menu-container-ul">
        <li className="menu-container-li">
          <IndexLink className="menu-container-li-a" to="/dist/">Calendar</IndexLink>
        </li>
        <li className="menu-container-li">
          <Link className="menu-container-li-a" to="/dist/other">Other</Link>
        </li>
      </ul>
    </div>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
