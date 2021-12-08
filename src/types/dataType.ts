import { FluidObject } from 'gatsby-image';

type postsType = {
  postItem: {
    excerpt: string;
    frontmatter: mdxType['frontmatter'];
    id: string;
    parent: {
      modifiedTime: string;
    };
    slug: string;
  }[];
};

type siteType = {
  siteMetadata: {
    title: string;
  };
};

type allFileType = {
  nodes: {
    name: string;
  }[];
};

type fileType = {
  childImageSharp: {
    fluid: FluidObject | FluidObject[];
  };
};

type mdxType = {
  frontmatter: {
    title: string;
    date: string;
    category: string;
    featuredImage: {
      childImageSharp: {
        fluid: FluidObject | FluidObject[];
      };
    };
  };
  body: string;
};

export type queryTypes = {
  site: siteType;
  allFile: allFileType;
  posts: postsType;
  file: fileType;
  mdx: mdxType;
};
