import React, { useState, useEffect } from 'react';
import * as style from './index.module.scss';
import './../styles/index.scss';
import { graphql, Link } from 'gatsby';
import Header from '../components/header/Header';
import { CategoryList } from '../components/category/CategoryList';
import PageLayout from '../components/layout/PageLayout';

type HomeProps = {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allFile: {
      nodes: {
        name: string;
      }[];
    };
    allMdx: {
      nodes: {
        excerpt: string;
        frontmatter: {
          date: string;
          title: string;
          category: string;
        };
        id: string;
        parent: {
          modifiedTime: string;
        };
        slug: string;
      }[];
    };
  };
};

const Home: React.FC<HomeProps> = (props) => {
  const { data } = props;
  const [posts, setPosts] = useState<HomeProps['data']['allMdx']['nodes']>(data.allMdx.nodes);
  const categories = data.allMdx.nodes.reduce((prev, current) => {
    const category = current.frontmatter.category;
    return prev.includes(category) ? prev : [...prev, category];
  }, [] as string[]);
  const [category, setCategory] = useState<string>('All');

  const onClickCategory = (category: string) => {
    setCategory(category);
  };

  useEffect(() => {
    if (category !== 'All') {
      setPosts(data.allMdx.nodes.filter((item) => item.frontmatter.category === category));
    } else {
      setPosts(data.allMdx.nodes);
    }
  }, [category, data.allMdx.nodes]);

  return (
    <>
      <Header />
      <PageLayout>
        <CategoryList categories={categories} category={category} setCategory={onClickCategory} />
        <ul className={style.post_list}>
          {posts.map((node) => (
            <li key={node.id} className={style.post_item}>
              <Link to={`/blog/${node.slug}`}>
                <article>
                  <div className={style.post_thumb} />
                  <span className={style.post_date}>
                    작성: {node.frontmatter.date} | 수정: {node.parent.modifiedTime}
                  </span>
                  <h2 className={style.post_title}>{node.frontmatter.title}</h2>
                  <div className={style.post_preview}>{node.excerpt}</div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </PageLayout>
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile {
      nodes {
        name
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }, filter: { frontmatter: { category: { ne: null } } }) {
      nodes {
        parent {
          ... on File {
            modifiedTime(formatString: "MMMM D, YYYY")
          }
        }
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          category
        }
        id
        excerpt(pruneLength: 200, truncate: true)
        slug
      }
    }
  }
`;

export default Home;
