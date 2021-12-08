import * as React from 'react';
import Layout from '../components/layout/PostLayout';
import CodeBlock from '../components/CodeBlock/CodeBlock';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { queryTypes } from 'types/dataType';

type BlogPostProps = {
  data: queryTypes;
};

const components = {
  //코드 스타일링
  code: CodeBlock,
};

const PostTemplate: React.FC<BlogPostProps> = ({ data }) => {
  console.log('data', data);
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

export default PostTemplate;
