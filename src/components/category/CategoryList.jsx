import React from 'react';
import * as style from './CategoryList.module.scss';
import { CategoryItem } from './CategoryItem';

export const CategoryList = ({ categories = [], category, setCategory }) => {
  return (
    <ul className={style.container} role="tablist" id="category">
      <CategoryItem title={'All'} selectedCategory={category} onClick={setCategory} isActive={category === 'All'} />
      {categories.map((title, idx) => (
        <CategoryItem
          key={idx}
          title={title}
          selectedCategory={category}
          onClick={setCategory}
          isActive={category === title}
        />
      ))}
    </ul>
  );
};
