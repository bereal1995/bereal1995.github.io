import React from 'react';

const PageLayout = ({ pageTitle, children, title, style }) => {
  return (
    <div className={style.container}>
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
