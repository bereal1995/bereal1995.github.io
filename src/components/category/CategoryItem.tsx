import React from 'react';
import * as styles from './CategoryItem.module.scss';

type CategoryItemProps = {
  title: string;
  isActive: boolean;
  onClick: (title: string) => void;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({ title, onClick, isActive }) => {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <li className={`${styles.item} ${isActive ? styles.active : ''}`}>
      <div className={styles.item_text} onClick={handleClick}>
        {title}
      </div>
    </li>
  );
};
