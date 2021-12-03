import React from 'react';
import * as style from './PageLayout.module.scss';

const PageLayout = ({ pageTitle, children, title }) => {
  return (
    <div className={style.container}>
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
