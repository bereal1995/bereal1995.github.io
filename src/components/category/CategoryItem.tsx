import React from 'react';
import * as style from './CategoryItem.module.scss';

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
    <li className={`${style.item} ${isActive ? style.active : ''}`}>
      <div onClick={handleClick}>{title}</div>
    </li>
  );
};
