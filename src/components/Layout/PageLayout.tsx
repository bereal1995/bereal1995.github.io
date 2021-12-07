import React from 'react';
import * as styles from './PostLayout.module.scss';

type PageLayoutProps = {};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default PageLayout;
