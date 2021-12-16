import React from 'react';
import * as style from './PostLayout.module.scss';
import Img from 'gatsby-image';
import { queryTypes } from 'types/dataType';
import { GatsbyImage } from 'gatsby-plugin-image';

type PostLayoutProps = {
  pageTitle?: string;
  title?: string;
  date?: string;
  imageData?: queryTypes['mdx']['frontmatter']['featuredImage'];
};

const PostLayout: React.FC<PostLayoutProps> = (props) => {
  const { children, title, date, imageData } = props;

  return (
    <div className={style.container}>
      <main>
        <div className={style.header}>
          {imageData && <GatsbyImage image={imageData} alt={'thumbnail'} />}
          <h1 className={style.title}>{title}</h1>
          <span className={style.date}>{date}</span>
        </div>
        {children}
      </main>
    </div>
  );
};

export default PostLayout;