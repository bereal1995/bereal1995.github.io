import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { queryTypes } from 'types/dataType';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import PostLayout from '../../components/layout/PostLayout';
import { getImage } from 'gatsby-plugin-image';

type BlogPostProps = {
  data: queryTypes;
};

const components = {
  //코드 스타일링
  code: CodeBlock,
};

const PostTemplate: React.FC<BlogPostProps> = ({ data }) => {
  const frontmatter = data.mdx.frontmatter;
  const imageData = frontmatter.featuredImage
    ? getImage(frontmatter.featuredImage)
    : getImage(data.file.childImageSharp);
  return (
    <PostLayout title={frontmatter.title} date={frontmatter.date} imageData={imageData}>
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
    file(relativePath: { eq: "thumb_null.png" }) {
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
      body
    }
  }
`;

export default PostTemplate;
