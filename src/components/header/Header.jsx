import React from 'react';
import * as style from './Header.module.scss';
import { Link } from 'gatsby';

const Header = ({ pageTitle, children, title }) => {
  return (
    <header className={style.container}>
      <div className={style.logo}>
        <h1>
          <Link to="/">HH Blog</Link>
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
