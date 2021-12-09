import React, { useState, useEffect } from 'react';
import './../styles/index.scss';
import { graphql } from 'gatsby';
import Header from '../components/header/Header';
import CategoryList from '../components/category/CategoryList';
import PageLayout from '../components/layout/PageLayout';
import { queryTypes } from 'types/dataType';
import PostList from '../components/post/PostList';

type HomeProps = {
  data: queryTypes;
};

const Home: React.FC<HomeProps> = (props) => {
  const { data } = props;
  const [posts, setPosts] = useState<queryTypes['allMdx']['posts']>(data.allMdx.posts);
  const [category, setCategory] = useState<string>('All');

  const categories = posts.reduce((prev, current) => {
    const category = current.frontmatter.category;
    return prev.includes(category) ? prev : [...prev, category];
  }, [] as string[]);

  const onClickCategory = (category: string) => {
    setCategory(category);
  };

  useEffect(() => {
    if (category !== 'All') {
      setPosts(posts.filter((item) => item.frontmatter.category === category));
    } else {
      setPosts(posts);
    }
  }, [category, posts]);

  console.log('data for home', data);
  return (
    <>
      <Header />
      <PageLayout>
        <CategoryList categories={categories} category={category} setCategory={onClickCategory} />
        <PostList posts={posts} thumbnailNull={data.file.childImageSharp} />
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
    file(relativePath: { eq: "thumb_null.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800)
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }, filter: { frontmatter: { category: { ne: null } } }) {
      posts: nodes {
        parent {
          ... on File {
            modifiedTime(formatString: "MMMM D, YYYY")
          }
        }
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          category
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 800)
            }
          }
        }
        id
        excerpt(pruneLength: 200, truncate: true)
        slug
      }
    }
  }
`;

export default Home;
