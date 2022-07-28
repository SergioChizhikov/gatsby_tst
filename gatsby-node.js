const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query Posts {
      allMarkdownRemark {
        nodes {
          frontmatter {
            category
            url
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach(node => {
    const { url, category } = node.frontmatter;
    actions.createPage({
      path: `/${category}/${url}`,
      component: path.resolve("./src/templates/single-post.js"),
      context: { url },
    });
  });
  // const { createPage } = actions
  // createPage({
  //   path: "/using-dsg",
  //   component: require.resolve("./src/templates/using-dsg.js"),
  //   context: {},
  //   defer: true,
  // })
};
