import React from 'react';
import * as styles from './PostLayout.module.scss';
import { queryTypes } from 'types/dataType';
import { GatsbyImage } from 'gatsby-plugin-image';
// import NavigationBar from './../navigationBar/NavigationBar';
import { getImage } from 'gatsby-plugin-image';

type PostLayoutProps = {
  pageTitle?: string;
  data: queryTypes;
};

const PostLayout: React.FC<PostLayoutProps> = (props) => {
  const { children, data } = props;

  const frontmatter = data.mdx.frontmatter;
  const imageData = frontmatter.featuredImage
    ? getImage(frontmatter.featuredImage)
    : getImage(data.file.childImageSharp);

  // const headList = data.mdx.mdxAST?.children.filter((item) => item.type === 'heading');

  return (
    <div className={styles.root}>
      <main>
        <div className={styles.header}>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <span className={styles.date}>{frontmatter.date}</span>
          {/* <NavigationBar list={headList} /> */}
        </div>
        {imageData && <GatsbyImage image={imageData} alt={'thumbnail'} className={styles.thumb} />}
        {children}
      </main>
    </div>
  );
};

export default PostLayout;
