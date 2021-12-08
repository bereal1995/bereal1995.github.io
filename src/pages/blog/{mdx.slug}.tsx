import * as React from 'react';
import Layout from '../../components/layout/PostLayout';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import { queryTypes } from 'types/dataType';

type BlogPostProps = {
  data: queryTypes;
};

const components = {
  //코드 스타일링
  code: CodeBlock,
};

const BlogPost: React.FC<BlogPostProps> = ({ data }) => {
  return (
    <Layout
      title={data.mdx.frontmatter.title}
      date={data.mdx.frontmatter.date}
      thumbUrl={data.file.childImageSharp.fluid}
    >
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
    file(relativePath: { eq: "thumb_test.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default BlogPost;
