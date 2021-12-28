import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { queryTypes } from 'types/dataType';
import PostLayout from '../../components/layout/PostLayout';
import CodeBlock from '../../components/codeBlock';
import Header from '../../components/header/Header';

type BlogPostProps = {
  data: queryTypes;
};

const components = {
  //코드 스타일링
  code: CodeBlock,
};

const PostTemplate: React.FC<BlogPostProps> = ({ data }) => {
  return (
    <>
      <Header />
      <PostLayout data={data}>
        <MDXProvider components={components}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </PostLayout>
    </>
  );
};

export const query = graphql`
  query ($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "thumb/thumb_null.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800)
      }
    }
    mdx(slug: { eq: $slug }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        category
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
      id
      body
      mdxAST
    }
  }
`;

export default PostTemplate;
