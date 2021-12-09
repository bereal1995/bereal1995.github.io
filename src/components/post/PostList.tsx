import React from 'react';
import * as styles from './PostList.module.scss';
import { queryTypes } from 'types/dataType';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export type PostListProps = {
  posts: queryTypes['allMdx']['posts'];
  thumbnailNull: queryTypes['file']['childImageSharp'];
};

const PostList: React.FC<PostListProps> = (props) => {
  const { posts, thumbnailNull } = props;
  const thumbnailNullImage = getImage(thumbnailNull);
  return (
    <div className={styles.root}>
      <ul className={styles.post_list}>
        {posts.map((node) => {
          const imageData = node.frontmatter.featuredImage
            ? getImage(node.frontmatter.featuredImage)
            : thumbnailNullImage;
          const ImgEl = imageData && <GatsbyImage image={imageData} alt={'thumbnail'} />;
          return (
            <li key={node.id} className={styles.post_item}>
              <Link to={`post/${node.slug}`}>
                <article>
                  <div className={styles.post_thumb}>{ImgEl}</div>
                  <span className={styles.post_date}>작성: {node.frontmatter.date}</span>
                  <h2 className={styles.post_title}>{node.frontmatter.title}</h2>
                  <div className={styles.post_preview}>{node.excerpt}</div>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostList;
