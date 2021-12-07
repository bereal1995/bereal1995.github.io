import React from 'react';
import * as style from './PostLayout.module.scss';

type PostLayoutProps = {
  pageTitle?: string;
  title?: string;
};

const PostLayout: React.FC<PostLayoutProps> = ({ pageTitle, children, title }) => {
  return (
    <div className={style.container}>
      <main>{children}</main>
    </div>
  );
};

export default PostLayout;
