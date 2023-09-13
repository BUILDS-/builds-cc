import type { GatsbyConfig } from "gatsby";
import fs from "fs";
import path from "path";

const srcDirs = fs.readdirSync(path.resolve(__dirname, "src"));

const rootDirsConfig = {};

srcDirs.forEach((srcDir) => {
  // @ts-ignore
  rootDirsConfig[srcDir] = path.resolve(__dirname, "src", srcDir);
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `builds.cc`,
    siteUrl: `https://builds.cc`
  },
  trailingSlash: 'never',
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
      resolve: "gatsby-plugin-root-import",
      options: {
        ...rootDirsConfig,
        static: path.resolve(__dirname, "static"),
      }
    },
  ]
};

export default config;
