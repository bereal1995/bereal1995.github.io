import React, { useEffect, useState } from 'react';
import { queryTypes } from 'types/dataType';
import * as styles from './NavigationBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export type NavigationBarProps = {
  items?: queryTypes['mdx']['tableOfContents']['items'];
  activeId?: string;
};

const NavMenu: React.FC<NavigationBarProps> = (props) => {
  const { items, activeId } = props;

  if (!items) return null;
  return (
    <ul>
      {items?.map((item, index) => {
        const id = item.url?.slice(1);
        return (
          <li key={item.title + index}>
            <a href={item.url} className={cx({ [styles.active]: activeId === id })}>
              {item.title}
            </a>
            <NavMenu items={item.items} activeId={activeId} />
          </li>
        );
      })}
    </ul>
  );
};

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const { items } = props;
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const headNode = document.querySelectorAll('h2, h3, h4, h5');
      const activeEl = Array.from(headNode).find((el) => {
        const elTop = (el as HTMLHeadingElement).getBoundingClientRect().top + window.scrollY;
        return elTop > window.scrollY;
      });

      if (activeEl) {
        setActiveId(activeEl.id);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.root}>
      <NavMenu items={items} activeId={activeId} />
    </div>
  );
};

export default NavigationBar;
