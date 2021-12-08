import { graphql } from 'gatsby';
import React from 'react';
import * as style from './PostLayout.module.scss';

type PostLayoutProps = {
  pageTitle?: string;
  title?: string;
  date?: string;
  thumbUrl?: string;
  // thumbUrl: FluidObject | FluidObject[];
};

const PostLayout: React.FC<PostLayoutProps> = (props) => {
  const { children, title, date, thumbUrl } = props;

  return (
    <div className={style.container}>
      <main>
        <div className={style.header}>
          {/* <img src={`images/${thumbUrl}`} alt="test" /> */}
          {/* <Img fluid={thumbUrl} className={style.thumb} /> */}
          <h1 className={style.title}>{title}</h1>
          <span className={style.date}>{date}</span>
        </div>
        {children}
      </main>
    </div>
  );
};

export default PostLayout;
