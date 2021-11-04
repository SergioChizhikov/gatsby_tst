import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Main</h1>

      <div className="posts">
        {nodes.map(post => {
          const { category, title, url, image } = post.frontmatter;
          const img = getImage(image);
          return (
            <div className="post" key={post.id}>
              <GatsbyImage image={img} alt={title} />
              <div>
                <Link to={`/${category}/${url}`}>{title}</Link>
              </div>
              <p>{post.excerpt}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
export default IndexPage;
export const query = graphql`
  query MainPage {
    allMarkdownRemark {
      nodes {
        excerpt
        frontmatter {
          category
          title
          url
          image {
            childImageSharp {
              gatsbyImageData(
                width: 200
                placeholder: TRACED_SVG
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        id
      }
    }
  }
`;
