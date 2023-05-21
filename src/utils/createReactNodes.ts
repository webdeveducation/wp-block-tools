import React from 'react';
import { v4 as uuid } from 'uuid';
import { convertStyleStringToReact } from './convertStyleStringToReact';

export function createReactNodes(
  html: any[],
  options?: {
    component?: JSX.Element;
    className?: string;
    renderInFragment?: boolean;
  }
) {
  const traverse = (node: any) => {
    // if this is a text node, just return the text
    if (node.type === 'text') {
      return node.data;
    }

    // if this is already a react component, just return the component
    if (node.type === 'react') {
      return node.component || null;
    }

    const { type, name, attribs, children } = node;

    // Convert attributes to React props
    const props: { [key: string]: any } = {};
    for (const key in attribs) {
      if (attribs.hasOwnProperty(key)) {
        if (key === 'style' && typeof attribs[key] === 'string') {
          props[key] = convertStyleStringToReact(attribs[key]);
        } else if (key === 'class') {
          props['className'] = attribs[key];
        } else if (key === 'viewbox') {
          props['viewBox'] = attribs[key];
        } else {
          props[key] = attribs[key];
        }
      }
    }

    if (
      (options?.component && !options?.className) ||
      (options?.component &&
        !!options?.className &&
        attribs.class.split(' ').find((c: string) => c === options.className))
    ) {
      return React.createElement(
        name,
        { ...props, key: uuid() },
        options.component
      );
    }

    const reactChildren = children.map((child: any) => traverse(child));

    // Create React component based on the node type
    if (type === 'tag') {
      return React.createElement(
        name,
        { ...props, key: uuid() },
        ...reactChildren
      );
    } else if (type === 'script' || type === 'style') {
      return React.createElement('div', {
        dangerouslySetInnerHTML: { __html: node.children[0].data },
        key: uuid(),
      });
    }

    return null; // Return null for unsupported node types
  };

  return html.map((el: any) => traverse(el));
}
