import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `dteqtive`,
    siteUrl: `https://www.dtegtive.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '1uygnl7j',
        dataset: 'production',
      },
    },

    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-RCGNH7LPLX',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-gatsby-cloud',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Courier Prime`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: 'swap',
      },
    },
  ],
};

export default config;
