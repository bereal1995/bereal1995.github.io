import React from 'react';
import * as style from './CategoryItem.module.scss';

export const CategoryItem = ({ title, onClick, isActive }) => {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <li className={`${style.item} ${isActive ? style.active : ''}`}>
      <div onClick={handleClick}>{title}</div>
    </li>
  );
};
