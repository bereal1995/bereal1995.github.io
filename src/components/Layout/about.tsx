import React from 'react';
import * as styles from './about.module.scss';

type AboutLayoutProps = {};

const AboutLayout: React.FC<AboutLayoutProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default AboutLayout;
