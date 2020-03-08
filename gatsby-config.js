module.exports = {
  pathPrefix: "/",
  siteMetadata: require("./site-metadata.json"),
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-source-data`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-158855682-1",
        head: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-plugin-stackbit-static-sass`,
      options: {
        inputFile: `${__dirname}/src/sass/main.scss`,
        outputFile: `${__dirname}/public/assets/css/main.css`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-component`, `gatsby-remark-highlight-code`]
      }
    },
    {
      resolve: `gatsby-remark-page-creator`,
      options: {}
    },
    {
      resolve: `@stackbit/gatsby-plugin-menus`,
      options: {
        sourceUrlPath: `fields.url`,
        pageContextProperty: `menus`,
        menus: require("./src/data/menus.json")
      }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://jandev.me/",
        sitemap: "https://jandev.me/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jan Arambulo`,
        short_name: `Jan`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`
      }
    },
    {
      resolve: `gatsby-remark-twitter-cards`,
      options: {
        title: "JanDev", // website title
        separator: "|", // default
        author: "jan arambulo",
        background: "#000000", // path to 1200x630px file or hex code, defaults to black (#000000)
        fontColor: "#228B22", // defaults to white (#ffffff)
        titleFontSize: 96, // default
        subtitleFontSize: 60, // default
        fontStyle: "monospace", // default
        fontFile: require.resolve("./static/assets/webfonts/fa-brands-400.ttf") // will override fontStyle - path to custom TTF font
      }
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: "https://jandev.us19.list-manage.com/subscribe/post?u=ddbb7977abe0d92e6eed24037&amp;id=551781f5c6"
      }
    }
  ]
};
