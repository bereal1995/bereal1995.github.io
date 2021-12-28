import React, { useCallback, useEffect, useRef } from 'react';
import * as styles from './NavigationBar.module.scss';

export type NavigationBarProps = {
  list?: any[];
};

// TODO: 네비게이션바 작업 필요함
const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const { list } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  const createTreeUi = useCallback((arr: any[], target: any, depth: number) => {
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
  }, []);

  useEffect(() => {
    if (rootRef.current && list) {
      createTreeUi(list, rootRef.current, 2);
    }
  }, [createTreeUi, list]);

  return <div className={styles.root} ref={rootRef}></div>;
};

export default NavigationBar;
