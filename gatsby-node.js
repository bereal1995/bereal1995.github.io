// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);

  // query for all markdown
  const result = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { category: { ne: null } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              slug
              frontmatter {
                title
                category
              }
            }
            previous {
              slug
              frontmatter {
                title
              }
            }
            next {
              slug
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  );

  // Create blog posts pages.
  const posts = result.data.allMdx.edges;
  posts.forEach((post) => {
    createPage({
      path: post.node.slug,
      component: blogPostTemplate,
      context: post,
    });
  });
};
