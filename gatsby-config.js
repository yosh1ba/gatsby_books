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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-164000164-2`,
        head: true,
        respectDNT: true,
        exclude: [`/cat/**`, `/test/`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ESSENTIALS エッセンシャルズ`,
        short_name: `ESSENTIALS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#477294`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken:  process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        createLinkInHead: true,
        exclude: [`/cat/**`, `/test/`],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }`,
       serialize: ({site, allSitePage}) => {
         return allSitePage.nodes.map(node =>{
           return {
             url: `${site.siteMetadata.siteUrl}${node.path}`,
             changefreq: `weekly`,
             priority: 0.5,
           }
         })
       },
      },
    },
  ],
}
