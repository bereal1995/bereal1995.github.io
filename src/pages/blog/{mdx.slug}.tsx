import * as React from 'react';
import Layout from '../../components/layout/PostLayout';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import * as style from './blog.module.scss';

type BlogPostProps = {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    mdx: {
      frontmatter: {
        title: string;
        date: string;
      };
      body: string;
    };
  };
};

const components = {
  //코드 스타일링
  code: CodeBlock,
};

const BlogPost: React.FC<BlogPostProps> = ({ data }) => {
  return (
    <Layout title={data.mdx.frontmatter.title} date={data.mdx.frontmatter.date}>
      <MDXProvider components={components}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`;

export default BlogPost;
