const path = require("path")

exports.createPages = async ({ graphql, actions, reporter}) => {
  const { createPage } = actions

  const blogresult = await graphql(`
    query MyQuery {
      allContentfulBlogPost(sort: {order: DESC, fields: publishDate}) {
        edges {
          node {
            id
            slug
          }
          next {
            title
            slug
          }
          previous {
            title
            slug
          }
        }
      }
    }
  `)

  if (blogresult.errors){
    reporter.panicOnBuild(`Graphqlのクエリでエラーが発生しました`)
    return
  }

  blogresult.data.allContentfulBlogPost.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/blog/post/${node.slug}/`,
      component: path.resolve(`./src/templates/blogpost-template.js`),
      context: {
        id: node.id,
        next,
        previous,
      },
    })
  })
}