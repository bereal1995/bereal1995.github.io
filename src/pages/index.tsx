import React, { useState, useEffect } from 'react';
import './../styles/index.scss';
import { graphql } from 'gatsby';
import Header from '../components/header/Header';
import CategoryList from '../components/category/CategoryList';
import PageLayout from '../components/layout/PageLayout';
import PostList from '../components/post/PostList';
import { queryTypes } from '../types/dataType';

type HomeProps = {
  data: queryTypes;
};

const Home: React.FC<HomeProps> = (props) => {
  const { data } = props;
  const allPost = data.allMdx.posts;
  const [posts, setPosts] = useState<queryTypes['allMdx']['posts']>(allPost);
  const [category, setCategory] = useState<string>('All');

  const categories = allPost.reduce((prev, current) => {
    const category = current.frontmatter.category;
    return prev.includes(category) ? prev : [...prev, category];
  }, [] as string[]);

  const onClickCategory = (category: string) => {
    setCategory(category);
  };

  useEffect(() => {
    if (category !== 'All') {
      setPosts(allPost.filter((item) => item.frontmatter.category === category));
    } else {
      setPosts(allPost);
    }
  }, [category, allPost]);

  return (
    <>
      <Header avatar={data.avatar} />
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
    file(relativePath: { eq: "thumb/thumb_null.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800)
      }
    }
    avatar: file(relativePath: { eq: "profile.png" }) {
      childImageSharp {
        gatsbyImageData(width: 100, height: 100, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { slug: { ne: "resume" }, frontmatter: { category: { ne: null } } }
    ) {
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
              gatsbyImageData(width: 600)
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
