# WordPress Block Tools

> **Note**
> This library is still in development so if there are any blocks not rendering correctly please create a new issue.

Use this library to render WordPress Gutenberg blocks in your Next JS or Gatsby JS sites.

## Installation

`npm i @webdeveducation/wp-block-tools`

or

`yarn add @webdeveducation/wp-block-tools`

### Required WordPress plugins

You'll also need the following plugins installed in your WordPress site:

- [WP GraphQL](https://wordpress.org/plugins/wp-graphql/)
- [WP GraphQL Blocks](https://github.com/webdeveducation/wp-graphql-blocks/releases)
- [WP GraphQL Theme Stylesheet](https://github.com/webdeveducation/wp-graphql-theme-stylesheet/releases)
- [WP Gatsby](https://wordpress.org/plugins/wp-gatsby/) (Required when working with Gatsby but not needed when working with Next JS)

# Gatsby Instructions

## Basic usage

### Step 1 - Styles

There's 2 stylesheets you need to make your WordPress blocks look exactly like a "native" WordPress site.
The first is the general styles for every core WordPress block. You can import this in `gatsby-browser.js` like so:

```js
// gatsby-browser.js
import '@webdeveducation/wp-block-tools/dist/css/style.css';
```

The second is the theme specific styles. We'll first need to query the stylesheet using the _WP GraphQL Theme Stylesheet_ plugin, then write that to a css file and reference that css file. This is best done in createPages in `gatsby-node.js` like so:

```js
// gatsby-node.js
const fs = require('fs');
exports.createPages = async ({ graphql }) => {
  try {
    const { data } = await graphql(`
      query ThemeStylesheetQuery {
        wp {
          themeStylesheet
        }
      }
    `);
    fs.writeFileSync('./public/themeStylesheet.css', data.wp.themeStylesheet);
  } catch (err) {
    console.error(err);
  }
};
```

Then reference this new css file in `gatsby-browser.js` like so:

```js
// gatsby-browser.js
import './public/themeStylesheet.css';
import '@webdeveducation/wp-block-tools/dist/css/style.css';
```

### Step 2 - Querying block data and assigning ID's

The _WP GraphQL Blocks_ plugin exposes a new field we can query called `blocks` for every post or page.
For example we can query the blocks when we `createPages`. WordPress doesn't assign ID's to blocks so we also need to generate these ourselves with the `assignIds` helper function like so:

```js
// gatsby-node.js
const path = require('path');
const { assignIds } = require('@webdeveducation/wp-block-tools');

exports.createPages = async ({ actions, graphql }) => {
  // ... underneath our stylesheet query ...

  try {
    const pageTemplate = path.resolve(`src/templates/page.js`);

    const { data } = await graphql(`
      query AllPagesQuery {
        allWpPage {
          nodes {
            blocks
            uri
          }
        }
      }
    `);

    for (let i = 0; i < data.allWpPage.nodes.length; i++) {
      const page = data.allWpPage.nodes[i];
      let blocks = assignIds(page.blocks);
      createPage({
        path: page.uri,
        component: pageTemplate,
        context: {
          blocks,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
};
```

### Step 3 - Rendering blocks

Finally we can render our blocks with the `BlockRendererProvider` component. If we follow the example above when creating pages, we need a component in `src/templates/page.js` so make sure that file exists, then we can render our blocks like so:

```js
// src/templates/page.js
import React from 'react';
import { BlockRendererProvider } from '@webdeveducation/wp-block-tools';

const Page = ({ pageContext }) => {
  return <BlockRendererProvider allBlocks={pageContext.blocks} />;
};

export default Page;
```

## Advanced usage

### Render Gatsby Link for all internal links

For this we can use the `siteDomain` (the `siteDomain` refers to the domain / subdomain that your WordPress site is hosted on) and `customInternalLinkComponent` props like so:

```js
// src/templates/page.js
import React from 'react';
import { BlockRendererProvider } from '@webdeveducation/wp-block-tools';
import { Link } from 'gatsby';

const Page = ({ pageContext }) => {
  const customInternalLinkComponent = (
    { internalHref, target, rel, className, children },
    index
  ) => {
    return (
      <Link
        key={index}
        to={internalHref}
        className={className}
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    );
  };

  return (
    <BlockRendererProvider
      customInternalLinkComponent={customInternalLinkComponent}
      siteDomain="wp.mydomain.com"
      allBlocks={pageContext.blocks}
    />
  );
};
```

> **Note**
> The `siteDomain` doesn't care about the protocol so can be specified without the protocol, or with either http or https, it doesn't matter. For example all these will result in exactly the same behaviour :

```js
siteDomain = 'wp.mydomain.com';
siteDomain = 'http://wp.mydomain.com';
siteDomain = 'https://wp.mydomain.com';
```

> And any of the above will match any internal links that match the domain name, independent of the protocol, so specifying `wp.mydomain.com` will also return links in the `customInternalLinkComponent` that match `http://wp.mydomain.com` and `https://wp.mydomain.com`.

### Render custom components

We can render a custom component for a particular block type by using the `renderComponent` prop in the `BlockRendererProvider`. For example, let's say we want to force all column blocks to have a `border: 5px solid red`. We would also need to be able to render the `innerBlocks` for that column block so we can also use the `BlockRenderer` component like so:

```js
// src/templates/page.js
import React from 'react';
import {
  BlockRendererProvider,
  BlockRenderer,
} from '@webdeveducation/wp-block-tools';

const Page = ({ pageContext }) => {
  const blockRendererComponents = (block) => {
    switch (block.name) {
      case 'core/column': {
        return (
          <div key={block.id} style={{ border: '5px solid red' }}>
            <BlockRenderer blocks={block.innerBlocks} />
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <BlockRendererProvider
      renderComponent={blockRendererComponents}
      siteDomain="wp.mydomain.com"
      allBlocks={pageContext.blocks}
    />
  );
};
```

#### Use Gatsby Image for image components

First of all we need to make the gatsbyImage available for our `core/image` block. This can be done in `gatsby-node.js` right after we `assignIds`:

```js
for (let i = 0; i < data.allWpPage.nodes.length; i++) {
  const page = data.allWpPage.nodes[i];
  let blocks = assignIds(page.blocks);
  blocks = await assignGatsbyImage({
    blocks,
    graphql,
    coreImage: true,
    //coreMediaText: true,
    //coreCover: true,
  });
  createPage({
    path: page.uri,
    component: pageTemplate,
    context: {
      blocks,
    },
  });
}
```

Then we can update our `blockRendererComponents` to cater for the `core/image` block:

```js
// src/templates/page.js
import { getClasses, getStyles } from '@webdeveducation/wp-block-tools';
import { GatsbyImage } from 'gatsby-plugin-image';

// ...

const blockRendererComponents = (block) => {
  switch (block.name) {
    case 'core/column': {
      return (
        <div key={block.id} style={{ border: '5px solid red' }}>
          <BlockRenderer blocks={block.innerBlocks} />
        </div>
      );
    }
    case 'core/image': {
      const { gatsbyImage } = block.attributes;
      if (!gatsbyImage) {
        return null;
      }
      return (
        <figure key={block.id} className={getClasses(block)}>
          <GatsbyImage
            image={block.attributes.gatsbyImage}
            alt={block.attributes.alt || ''}
            style={getStyles(block)}
          />
        </figure>
      );
    }
    default:
      return null;
  }
};

// ...
```

> **Note**
> The `getClasses` and `getStyles` helpers will return the associated WordPress classes and styles for this particular block type. For example if we set a rounded border for the image block in WordPress, then this will be returned by `getStyles` so we can apply this to our Gatsby Image. This makes our Gatsby Image render identical to the WordPress `core/image`.

---

# Next JS Instructions

## Basic usage

### Step 1 - Styles

There's 2 stylesheets you need to make your WordPress blocks look exactly like a "native" WordPress site.
The first is the general styles for every core WordPress block. You can import this in `styles/globals.css` like so:

```css
// styles/globals.css
@import '~@webdeveducation/wp-block-tools/dist/css/style.css';
```

The second is the theme specific styles. We'll first need to query the stylesheet using the _WP GraphQL Theme Stylesheet_ plugin, then write that to a css file and reference that css file. This is best done `getStaticPaths` in `pages/[[...slug]].js` like so:

```js
// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.WP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
```

```
// .env.local
WP_GRAPHQL_URL=http://my-wordpress-site.local/graphql
```

```js
// pages/[[...slug]].js
import fs from 'fs';
import client from '../apolloClient';
import { gql } from '@apollo/client';
import {
  assignIds,
  BlockRendererProvider,
} from '@webdeveducation/wp-block-tools';

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        themeStylesheet
        pages {
          nodes {
            uri
          }
        }
        posts {
          nodes {
            uri
          }
        }
      }
    `,
  });

  try {
    fs.writeFileSync('./public/themeStylesheet.css', data.themeStylesheet);
  } catch (e) {
    console.log('ERROR WRITING FILE!', e);
  }

  return {
    paths: [...data.pages.nodes, ...data.posts.nodes].map((page) => ({
      params: {
        slug: page.uri.substring(1, page.uri.length - 1).split('/'),
      },
    })),
    fallback: false,
  };
};
```

Then reference this new css file in `styles/globals.css` like so:

```css
// styles/globals.css
@import '/themeStylesheet.css';
@import '~@webdeveducation/wp-block-tools/dist/css/style.css';
```

### Step 2 - Querying block data and assigning ID's

The _WP GraphQL Blocks_ plugin exposes a new field we can query called `blocks` for every post or page. WordPress doesn't assign ID's to blocks so we also need to generate these ourselves with the `assignIds` helper function.
For example we can query the blocks when we `getStaticProps` like so:

```js
// pages/[[...slug]].js
import { assignIds } from '@webdeveducation/wp-block-tools';

export const getStaticProps = async (context) => {
  const uri = context.params?.slug ? `/${context.params.slug.join('/')}/` : '/';

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            blocks
          }
          ... on Post {
            blocks
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });

  return {
    props: {
      blocks: assignIds(data.nodeByUri.blocks || []),
    },
  };
};
```

### Step 3 - Render blocks

Then we can finally render our blocks with the `BlockRendererProvider` component like so:

```js
// pages/[[...slug]].js
import { BlockRendererProvider } from '@webdeveducation/wp-block-tools';

const Page = ({ blocks }) => {
  return <BlockRendererProvider allBlocks={blocks} />;
};

export default Page;
```

## Advanced usage

### Render Next Link for all internal links

For this we can use the `siteDomain` (the `siteDomain` refers to the domain / subdomain that your WordPress site is hosted on) and `customInternalLinkComponent` props like so:

```js
// pages/[[...slug]].js
import Link from 'next/link';

const Page = ({ blocks }) => {
  const customInternalLinkComponent = (
    { internalHref, target, rel, className, children },
    index
  ) => {
    return (
      <Link
        key={index}
        href={internalHref}
        className={className}
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    );
  };
  return (
    <div>
      <BlockRendererProvider
        allBlocks={blocks}
        siteDomain="wp.mydomain.com"
        customInternalLinkComponent={customInternalLinkComponent}
      />
    </div>
  );
};
```

> **Note**
> The `siteDomain` doesn't care about the protocol so can be specified without the protocol, or with either http or https, it doesn't matter. For example all these will result in exactly the same behaviour :

```js
siteDomain = 'wp.mydomain.com';
siteDomain = 'http://wp.mydomain.com';
siteDomain = 'https://wp.mydomain.com';
```

> And any of the above will match any internal links that match the domain name, independent of the protocol, so specifying `wp.mydomain.com` will also return links in the `customInternalLinkComponent` that match `http://wp.mydomain.com` and `https://wp.mydomain.com`.

### Render custom components

We can render a custom component for a particular block type by using the `renderComponent` prop in the `BlockRendererProvider`. For example, let's say we want to force all column blocks to have a `border: 5px solid red`. We would also need to be able to render the `innerBlocks` for that column block so we can also use the `BlockRenderer` component like so:

```js
// src/templates/page.js
import React from 'react';
import {
  BlockRendererProvider,
  BlockRenderer,
} from '@webdeveducation/wp-block-tools';

const Page = ({ blocks }) => {
  const blockRendererComponents = (block) => {
    switch (block.name) {
      case 'core/column': {
        return (
          <div
            key={block.id}
            className={getClasses(block)}
            style={{ border: '5px solid red', ...getStyles(block) }}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <BlockRendererProvider
      renderComponent={blockRendererComponents}
      siteDomain="wp.mydomain.com"
      allBlocks={blocks}
    />
  );
};
```

> **Note**
> The `getClasses` and `getStyles` helpers will return the associated WordPress classes and styles for this particular block type. For example if we set a rounded border for the image block in WordPress, then this will be returned by `getStyles` so we can apply this to our Next Image. This makes our blocks render identical to the WordPress blocks.

#### Use Next Image for image components

We can update our `blockRendererComponents` to cater for the `core/image` block:

```js
// pages/[[...slug]].js
import { getClasses, getStyles } from '@webdeveducation/wp-block-tools';
import Image from 'next/image';

// ...

const blockRendererComponents = (block) => {
  switch (block.name) {
    case 'core/column': {
      return (
        <div
          key={block.id}
          className={getClasses(block)}
          style={{ border: '5px solid red', ...getStyles(block) }}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </div>
      );
    }
    case 'core/image': {
      return (
        <figure key={block.id} className={getClasses(block)}>
          <Image
            src={block.attributes.url}
            width={block.attributes.width}
            height={block.attributes.height}
            alt={block.attributes.alt || ''}
            style={getStyles(block)}
          />
        </figure>
      );
    }
    default:
      return null;
  }
};

// ...
```
