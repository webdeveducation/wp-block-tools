import React from 'react';
import { v4 as uuid } from 'uuid';
import { convertStyleStringToReact } from './convertStyleStringToReact';
import { convertAttributesToReactProps } from './convertAttributesToReactProps';
import { IBlockBase } from '../types';
import { getBlockGapStyle } from './getBlockGapStyle';

export function createReactNodes(options: {
  html: any[];
  block: IBlockBase;
  component?: JSX.Element;
  className?: string;
}) {
  const block = options.block;
  let elementCount: number = -1;
  const traverse = (node: any) => {
    elementCount++;
    // if this is a text node, just return the text
    if (node.type === 'text') {
      return node.data;
    }

    // if this is already a react component, just return the component
    if (node.type === 'react') {
      return node.component || null;
    }

    const { type, name, attribs, children } = node;

    const props: { [key: string]: any } =
      convertAttributesToReactProps(attribs);

    if (elementCount === 0 && block.name === 'core/group') {
      if (!props.style) {
        props.style = {};
      }

      props.style = { ...props.style, ...getBlockGapStyle(block.attributes) };
    }

    if (
      (options?.component && !options?.className) ||
      (options?.component &&
        !!options?.className &&
        attribs.class &&
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

  return options.html.map((el: any) => traverse(el));
}
