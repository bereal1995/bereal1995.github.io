import * as React from 'react';
import Layout from '../../components/Layout/PostLayout';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../../components/CodeBlock/CodeBlock';

const components = {
  //코드 스타일링
  code: CodeBlock,
};

const BlogPost = ({ data }) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title} title={data.site.siteMetadata.title}>
      <p>{data.mdx.frontmatter.date}</p>
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
