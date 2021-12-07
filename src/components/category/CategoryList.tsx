import React from 'react';
import * as style from './CategoryList.module.scss';
import { CategoryItem } from './CategoryItem';

type CategoryListProps = {
  categories: string[];
  category: string;
  setCategory: (category: string) => void;
};

export const CategoryList: React.FC<CategoryListProps> = ({ categories = [], category, setCategory }) => {
  return (
    <ul className={style.container} role="tablist" id="category">
      <CategoryItem title={'All'} onClick={setCategory} isActive={category === 'All'} />
      {categories.map((title, idx) => (
        <CategoryItem key={idx} title={title} onClick={setCategory} isActive={category === title} />
      ))}
    </ul>
  );
};
