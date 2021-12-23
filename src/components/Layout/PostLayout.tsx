import React from 'react';
import * as styles from './PostLayout.module.scss';
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
    <div className={styles.container}>
      <main>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.date}>{date}</span>
        </div>
        {imageData && <GatsbyImage image={imageData} alt={'thumbnail'} className={styles.thumb} />}
        {children}
      </main>
    </div>
  );
};

export default PostLayout;
