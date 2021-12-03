import React from 'react';
import Layout from '../components/Layout/Layout';
import * as style from './../components/Layout/Layout.module.scss';
import './../styles/index.scss';
import { graphql, Link } from 'gatsby';

const Home = ({ data, location }) => {
  return (
    <Layout pageTitle="HH Blog Posts" title={data.site.siteMetadata.title}>
      <ul className={style.post_list}>
        {data.allMdx.nodes.map((node) => (
          <li key={node.id} className={style.post_item}>
            <Link to={`/blog/${node.slug}`}>
              <article>
                <div className={style.post_thumb} />
                <span className={style.post_date}>
                  작성: {node.frontmatter.date} | 수정: {node.parent.modifiedTime}
                </span>
                <h2 className={style.post_title}>{node.frontmatter.title}</h2>
                <div className={style.post_preview}>{node.excerpt}</div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile {
      nodes {
        name
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        parent {
          ... on File {
            modifiedTime(formatString: "MMMM D, YYYY")
          }
        }
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        excerpt(pruneLength: 200, truncate: true)
        slug
      }
    }
  }
`;

export default Home;
