import React from 'react';
import * as style from './PostLayout.module.scss';

const PostLayout = ({ pageTitle, children, title }) => {
  return (
    <div className={style.container}>
      <main>{children}</main>
    </div>
  );
};

export default PostLayout;
