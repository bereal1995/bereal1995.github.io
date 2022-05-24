import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import * as styles from './PostThumbnail.module.scss';

export type PostThumbnailProps = {
  title: string;
  imageData?: IGatsbyImageData;
};

const PostThumbnail: React.FC<PostThumbnailProps> = (props) => {
  const { title, imageData } = props;

  return (
    <div className={styles.root}>
      {imageData ? (
        <GatsbyImage image={imageData} alt={'thumbnail'} />
      ) : (
        <div className={styles.thumb_null}>{title}</div>
      )}
    </div>
  );
};

export default PostThumbnail;
