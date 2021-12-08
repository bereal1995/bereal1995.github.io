import React from 'react';
import * as style from './PostLayout.module.scss';
import Img, { FixedObject, FluidObject } from 'gatsby-image';

type PostLayoutProps = {
  pageTitle?: string;
  title?: string;
  date?: string;
  thumbUrl: FluidObject | FluidObject[];
};

const PostLayout: React.FC<PostLayoutProps> = (props) => {
  const { children, title, date, thumbUrl } = props;

  console.log('thumbUrl', thumbUrl);
  return (
    <div className={style.container}>
      <main>
        <div className={style.header}>
          <Img fluid={thumbUrl} className={style.thumb} />
          <h1 className={style.title}>{title}</h1>
          <span className={style.date}>{date}</span>
        </div>
        {children}
      </main>
    </div>
  );
};

export default PostLayout;
