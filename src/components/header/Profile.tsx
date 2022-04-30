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
          몰랐던 것을 알고 새로운 것을 배우는 것을 좋아합니다.
        </div>
      </div>
    </div>
  );
};

export default Profile;
