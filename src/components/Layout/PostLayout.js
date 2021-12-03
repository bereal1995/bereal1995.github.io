import React from 'react';
import * as style from './PostLayout.module.scss';

const PostLayout = ({ pageTitle, children, title }) => {
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

export default PostLayout;
