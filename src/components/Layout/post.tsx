import React from 'react';
import * as styles from './post.module.scss';
import NavigationBar from './../navigationBar/NavigationBar';
import { getImage } from 'gatsby-plugin-image';
import { queryTypes } from '../../types/dataType';
import PostThumbnail from './../../components/post/PostThumbnail';

type PostLayoutProps = {
  pageTitle?: string;
  data: queryTypes;
};

const PostLayout: React.FC<PostLayoutProps> = (props) => {
  const { children, data } = props;

  const frontmatter = data.mdx.frontmatter;
  const imageData = getImage(frontmatter.featuredImage);

  return (
    <div className={styles.root}>
      <main>
        <div className={styles.header}>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <span className={styles.date}>{frontmatter.date}</span>
        </div>
        <PostThumbnail title={frontmatter.title} imageData={imageData} />
        {children}
      </main>
      <NavigationBar items={data.mdx.tableOfContents.items} />
    </div>
  );
};

export default PostLayout;
