import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const { nodes } = data.allMarkdownRemark
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Main</h1>

      <div>
        {nodes.map(post => {
          const { category, title, url, image } = post.frontmatter
          const img = getImage(image)
          return (
            <div key={post.id}>
              <GatsbyImage image={img} alt={title} />
              <Link to={`/${category}/${url}`}>{title}</Link>
              <p>{post.excerpt}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
export default IndexPage
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
`
