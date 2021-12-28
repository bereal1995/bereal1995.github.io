import React, { useEffect, useRef } from 'react';
import * as styles from './NavigationBar.module.scss';

export type NavigationBarProps = {
  list?: any[];
};

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const { list } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  console.log('list', list);

  const createTreeUi = function (arr: any[], target: any, depth: number) {
    const ul = document.createElement('ul');
    for (const el of arr) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const text = el.children[0].value;
      const id = el.children[0].value.replace(/\s/g, '-').replace(/\./g, '');
      a.setAttribute('href', `#${id}`);
      a.append(text);
      if (el.depth > depth) {
        createTreeUi([el], ul, el.depth);
      } else {
        li.append(a);
        ul.append(li);
        target.append(ul);
      }
    }
  };

  useEffect(() => {
    if (rootRef.current && list) {
      // createList(list, rootRef.current, 2);
      createTreeUi(list, rootRef.current, 2);
    }
  }, []);

  return <div className={styles.root} ref={rootRef}></div>;
};

export default NavigationBar;
