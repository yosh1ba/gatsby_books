import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock, faFolderOpen} from '@fortawesome/free-regular-svg-icons';
import {faChevronLeft, faChevronRight, faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import { graphql, Link } from "gatsby";

import { renderRichText } from "gatsby-source-contentful/rich-text"
import {BLOCKS} from "@contentful/rich-text-types"
import useContentfulImage from "../util/useContentfulImage"

import SEO from "../components/seo"
import {documentToPlainTextString} from "@contentful/rich-text-plain-text-renderer"

const options ={
  renderNode:{
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2>
        <FontAwesomeIcon icon={faCheckSquare} />
        {children}
      </h2>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <Img 
        fluid={useContentfulImage(node.data.target.file.url)}
        alt={
          node.data.target.description
            ? node.data.target.description
            : node.data.target.title
        }
      />
    ),
  },
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
}

export default({data, pageContext, location}) => (
  <Layout>
    <SEO
      pagetitle={data.contentfulBlogPost.title}
      pagedesc={`${documentToPlainTextString(JSON.parse(data.contentfulBlogPost.content.raw)).slice(0, 70)}･･･`}
      pagepath={location.pathname}
      blogimg={`https:${data.contentfulBlogPost.eyecatch.file.url}`}
      pageimgw={data.contentfulBlogPost.eyecatch.file.details.image.width}
      pageimgh={data.contentfulBlogPost.eyecatch.file.details.image.height}
    />
            <div className="eyecatch">
          <figure>
            <Img
              fluid={data.contentfulBlogPost.eyecatch.fluid}
              alt={data.contentfulBlogPost.eyecatch.description}
            />
          </figure>
        </div>
        <article className="content">
          <div className="container">
            <h1 className="bar">{data.contentfulBlogPost.title}</h1>
            <aside className="info">
              <time dateTime={data.contentfulBlogPost.publishDate}>
                <FontAwesomeIcon icon={faClock}/>
                {data.contentfulBlogPost.publishDateJP}</time>
              <div className="cat">
              <FontAwesomeIcon icon={faFolderOpen}/>
                <ul>
                  {data.contentfulBlogPost.category.map( cat => (
                    <li className={cat.categorySlug} key={cat.id}>
                      {cat.category}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="postbody">
              {renderRichText(data.contentfulBlogPost.content,options)}
            </div>
            <ul className="postlink">
              {pageContext.next && (
                <li className="prev">
                  <Link to={`/blog/post/${pageContext.next.slug}/`} rel="prev">
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    <span>{pageContext.next.title}</span>
                  </Link>
                </li>
              )}
              {pageContext.previous && (
                <li className="next">
                  <Link to={`/blog/post/${pageContext.previous.slug}/`} rel="next">
                    <span>{pageContext.previous.title}</span>
                    <FontAwesomeIcon icon={faChevronRight}/>
                    </Link>
                </li>
              )}
            </ul>
          </div>
        </article>
  </Layout>
)

export const query = graphql `
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id}) {
      title
      publishDateJP:publishDate(formatString: "YYYY年MM月DD日")
      publishDate
      category {
        category
        categorySlug
        id
      }
      eyecatch {
        fluid (maxWidth: 1600){
          ...GatsbyContentfulFluid_withWebp
        }
        description
        file {
          details {
            image {
              height
              width
            }
          }
          url
        }
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            file {
              url
            }
          }
          description
          title
        }
      }
    }
  }
`