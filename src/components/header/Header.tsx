import React from 'react';
import * as styles from './Header.module.scss';
import { Link } from 'gatsby';
import { queryTypes } from 'types/dataType';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

type HeaderProps = {
  pageTitle?: string;
  title?: string;
  avatar: queryTypes['avatar'];
};

const Header: React.FC<HeaderProps> = ({ pageTitle, children, title, avatar }) => {
  const avatarImage = getImage(avatar.childImageSharp);

  return (
    <header className={styles.container}>
      <div className={styles.top}>
        <div className={styles.logo}>
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
      </div>
      <div className={styles.profile}>
        <div className={styles.thumb}>{avatarImage && <GatsbyImage image={avatarImage} alt="avatar_img" />}</div>
        <div className={styles.profile_text}>
          <h2>조효형</h2>
          <span>프론트엔드 개발자 조효형입니다.</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
