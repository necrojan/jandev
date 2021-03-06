import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {safePrefix} from '../utils';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        return (
          <React.Fragment>
            <Helmet>
              <title>
                {_.get(this.props, "pageContext.frontmatter.title") &&
                  _.get(this.props, "pageContext.frontmatter.title") + " - "}
                {_.get(this.props, "pageContext.site.siteMetadata.title")}
              </title>
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initialScale=1.0"
              />
              <meta name="google" content="notranslate" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:image"
                content={_.get(
                  this.props,
                  "pageContext.site.siteMetadata.image"
                )}
              />
              <meta
                name="twitter:creator"
                content={_.get(
                  this.props,
                  "pageContext.site.siteMetadata.twitterUsername"
                )}
              />
              <meta
                property="og:title"
                content={_.get(
                  this.props,
                  "pageContext.site.siteMetadata.title"
                )}
              />
              <meta
                property="og:description"
                content={_.get(
                  this.props,
                  "pageContext.site.siteMetadata.description"
                )}
              />
              <meta
                name="twitter:title"
                content={_.get(
                  this.props,
                  "pageContext.site.siteMetadata.title"
                )}
              />
              <meta
                name="twitter:description"
                content={_.get(
                  this.props,
                  "pageContext.site.siteMetadata.description"
                )}
              />
              <link
                href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"
                rel="stylesheet"
              />
              <link rel="stylesheet" href={safePrefix("assets/css/main.css")} />
              {_.get(this.props, "pageContext.frontmatter.template") ===
                "post" &&
                _.get(this.props, "pageContext.frontmatter.canonical_url") && (
                  <link
                    rel="canonical"
                    href={_.get(
                      this.props,
                      "pageContext.frontmatter.canonical_url"
                    )}
                  />
                )}
            </Helmet>
            <div
              id="page"
              className={
                "site style-" +
                _.get(
                  this.props,
                  "pageContext.site.siteMetadata.layout_style"
                ) +
                " palette-" +
                _.get(this.props, "pageContext.site.siteMetadata.palette")
              }
            >
              <Header {...this.props} />
              <div id="content" className="site-content">
                <div className="inner">
                  <main id="main" className="site-main">
                    {this.props.children}
                  </main>
                  <Footer {...this.props} />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
    }

    async componentDidMount() {
      try {
        const deckdeckgoLoader =
          require("@deckdeckgo/highlight-code/dist/loader");
        
        await deckdeckgoLoader.defineCustomElements(window);
      } catch (err) {
        console.error(err);
      }
    }
}
