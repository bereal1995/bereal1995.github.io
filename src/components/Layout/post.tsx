import React from 'react';
import * as styles from './post.module.scss';
import { GatsbyImage } from 'gatsby-plugin-image';
import NavigationBar from './../navigationBar/NavigationBar';
import { getImage } from 'gatsby-plugin-image';
import { queryTypes } from '../../types/dataType';

type PostLayoutProps = {
  pageTitle?: string;
  data: queryTypes;
};

const PostLayout: React.FC<PostLayoutProps> = (props) => {
  const { children, data } = props;

  const frontmatter = data.mdx.frontmatter;
  const imageData = frontmatter.featuredImage
    ? getImage(frontmatter.featuredImage)
    : getImage(data.nullThumb.childImageSharp);

  return (
    <div className={styles.root}>
      <main>
        <div className={styles.header}>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <span className={styles.date}>{frontmatter.date}</span>
        </div>
        {imageData && <GatsbyImage image={imageData} alt={'thumbnail'} className={styles.thumb} />}
        {children}
      </main>
      <NavigationBar items={data.mdx.tableOfContents.items} />
    </div>
  );
};

export default PostLayout;
