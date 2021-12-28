import React from 'react';
import * as styles from './Header.module.scss';
import { Link } from 'gatsby';
import { queryTypes } from 'types/dataType';
import { getImage } from 'gatsby-plugin-image';
import Profile from './Profile';

type HeaderProps = {
  pageTitle?: string;
  title?: string;
  avatar?: queryTypes['avatar'];
};

const Header: React.FC<HeaderProps> = ({ pageTitle, children, title, avatar }) => {
  return (
    <header className={styles.container}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <h1>
            <Link to="/">HH Blog</Link>
          </h1>
        </div>
        <nav>
          <ul className={styles.nav}>
            <li>
              <a href="https://github.com/bereal1995">Github</a>
            </li>
            <li>
              <Link to="/about/resume">About</Link>
            </li>
          </ul>
        </nav>
      </div>
      {avatar && <Profile avatarImage={getImage(avatar.childImageSharp)} />}
    </header>
  );
};

export default Header;
