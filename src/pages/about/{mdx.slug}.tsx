import * as React from 'react';
import { graphql } from 'gatsby';
import { queryTypes } from 'types/dataType';
import AboutLayout from './../../components/layout/AboutLayout';
import { MDXRenderer } from 'gatsby-plugin-mdx';

type AboutProps = {
  data: queryTypes;
};

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <AboutLayout>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </AboutLayout>
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
      parent {
        ... on File {
          modifiedTime(formatString: "MMMM D, YYYY")
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        category
      }
      body
    }
  }
`;

export default About;
