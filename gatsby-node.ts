const path = require('path');
exports.createPages = async ({ actions, graphql }: any) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query WebDevPageQuery {
      allSanityWorkSample(filter: { category: { eq: "web development" } }) {
        nodes {
          name
          url
          image {
            asset {
              gatsbyImageData(width: 400)
            }
          }
          images {
            caption
            asset {
              gatsbyImageData(width: 960)
            }
          }
          youtube {
            url
          }
          caption
          category
          slug {
            current
          }
          toolsUsed {
            id
            name
            image {
              asset {
                gatsbyImageData(width: 100)
              }
            }
          }
        }
      }
    }
  `);
  data.allSanityWorkSample.nodes.forEach((node: any) => {
    createPage({
      path: node.slug.current,
      component: path.resolve('src/templates/webDevTemplate.tsx'),
      context: {
        node,
      },
    });
  });
};
