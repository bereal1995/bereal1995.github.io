import React from 'react';
import * as style from './PostLayout.module.scss';

type PostLayoutProps = {
  pageTitle?: string;
  title?: string;
  date?: string;
};

const PostLayout: React.FC<PostLayoutProps> = ({ children, title, date }) => {
  return (
    <div className={style.container}>
      <main>
        <div className={style.header}>
          <h1 className={style.title}>{title}</h1>
          <span className={style.date}>{date}</span>
        </div>
        {children}
      </main>
    </div>
  );
};

export default PostLayout;
