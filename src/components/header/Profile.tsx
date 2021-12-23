import React from 'react';
import * as styles from './Profile.module.scss';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

export type ProfileProps = {
  avatarImage?: IGatsbyImageData;
};

const Profile: React.FC<ProfileProps> = (props) => {
  const { avatarImage } = props;

  return (
    <div className={styles.root}>
      <div className={styles.thumb}>{avatarImage && <GatsbyImage image={avatarImage} alt="avatar_img" />}</div>
      <div className={styles.profile_text}>
        <div>
          웹 프론트엔드 개발자 조효형입니다. <br />
          꾸준히 공부하기 위해 노력중이고, 재미있는 기능을 사용해보는걸 좋아합니다.
        </div>
      </div>
    </div>
  );
};

export default Profile;
