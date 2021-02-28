/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title : `ESSENTIALS`,
    description : `おいしい食材と食事を探求するサイト`,
    lang : `ja`,
    siteUrl : `https://distracted-darwin-9668e6.netlify.app`,
    locale: `ja-JP`,
    fbappid: `XXXXXXXXXXXXXXX`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-react-helmet`
  ],
}
