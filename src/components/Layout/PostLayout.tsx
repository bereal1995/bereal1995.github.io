import React from 'react';
import * as style from './PostLayout.module.scss';
import Img, { FluidObject } from 'gatsby-image';

type PostLayoutProps = {
  pageTitle?: string;
  title?: string;
  date?: string;
  fluid?: FluidObject | FluidObject[];
};

const PostLayout: React.FC<PostLayoutProps> = (props) => {
  const { children, title, date, fluid } = props;

  return (
    <div className={style.container}>
      <main>
        <div className={style.header}>
          {fluid && <Img fluid={fluid} className={style.thumb} />}
          <h1 className={style.title}>{title}</h1>
          <span className={style.date}>{date}</span>
        </div>
        {children}
      </main>
    </div>
  );
};

export default PostLayout;
