import { IGatsbyImageData } from 'gatsby-plugin-image';

type postsType = {
  excerpt: string;
  frontmatter: mdxType['frontmatter'];
  id: string;
  parent: {
    modifiedTime: string;
  };
  slug: string;
}[];

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
  childImageSharp: IGatsbyImageData;
};

type mdxType = {
  frontmatter: {
    title: string;
    date: string;
    category: string;
    featuredImage: IGatsbyImageData;
    embeddedImagesLocal: any;
  };
  body: string;
};

export type queryTypes = {
  site: siteType;
  allFile: allFileType;
  allMdx: {
    posts: postsType;
  };
  file: fileType;
  avatar: fileType;
  mdx: mdxType;
};
