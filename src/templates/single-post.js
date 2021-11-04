import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";

const SinglePost = ({ data }) => {

  const { html } = data.markdownRemark;
  const { title, category, image } = data.markdownRemark.frontmatter;
  const img = getImage(image);

  return (
    <Layout>
      <Seo title={title} />
      <h1>{title}</h1>
      <p>Категория: {category}</p>
      <div>
        <GatsbyImage image={img} alt={title} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default SinglePost;

export const query = graphql`
  query PostQuery($url: String) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      html
      frontmatter {
        title
        url
        category
        image {
          childImageSharp {
            gatsbyImageData(width: 600, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
