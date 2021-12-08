import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { queryTypes } from 'types/dataType';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import PostLayout from '../../components/layout/PostLayout';

type BlogPostProps = {
  data: queryTypes;
};

const components = {
  //코드 스타일링
  code: CodeBlock,
};

const PostTemplate: React.FC<BlogPostProps> = ({ data }) => {
  const frontmatter = data.mdx.frontmatter;
  return (
    <PostLayout
      title={frontmatter.title}
      date={frontmatter.date}
      fluid={frontmatter.featuredImage?.childImageSharp.fluid}
    >
      <MDXProvider components={components}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </PostLayout>
  );
};

export const query = graphql`
  query ($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(slug: { eq: $slug }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        category
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      body
    }
  }
`;

export default PostTemplate;
