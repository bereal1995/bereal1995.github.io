import React from 'react';
import * as style from './Layout.module.scss';

const Layout = ({ pageTitle, children, title }) => {
  return (
    <div className={style.container}>
      <title>
        {pageTitle} | {title}
      </title>
      <header className={'style.siteTitle'}>{title}</header>
      <main>
        <h1 className={'style.heading'}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
