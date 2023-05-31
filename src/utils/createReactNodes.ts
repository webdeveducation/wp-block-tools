import React from 'react';
import { v4 as uuid } from 'uuid';
import { convertStyleStringToReact } from './convertStyleStringToReact';
import { convertAttributesToReactProps } from './convertAttributesToReactProps';
import { IBlockBase } from '../types';
import { getBlockGapStyle } from './getBlockGapStyle';
import { getBlockById } from './getBlockById';
import { getBlockGapStyleForChild } from './getBlockGapStyleForChild';

export function createReactNodes(options: {
  html: any[];
  allBlocks: IBlockBase[];
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

    if (!props.style) {
      props.style = {};
    }

    props.style = { ...props.style, ...getBlockGapStyle(block.attributes) };

    // if top level element and if generated class name of wp-container-{id}
    // we need to apply styles from the parent to this block
    if (
      attribs?.class &&
      attribs.class?.indexOf('wp-container-') !== -1 &&
      block.parentId
    ) {
      const parentBlock = getBlockById(options.allBlocks, block.parentId);

      if (parentBlock?.name === 'core/column') {
        props.style = {
          ...props.style,
          ...getBlockGapStyleForChild(parentBlock.attributes),
        };
      }
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

    const reactChildren = (children || []).map((child: any) => traverse(child));

    // Create React component based on the node type
    if (type === 'tag') {
      return React.createElement(
        name,
        { ...props, key: uuid() },
        ...reactChildren
      );
    } else if (type === 'style') {
      return React.createElement('style', {
        scoped: !!Object.keys(node.attribs).find((s) => s === 'scoped'),
        dangerouslySetInnerHTML: { __html: node.children[0].data },
        key: uuid(),
      });
    } // currently ignore type === "script"

    return null; // Return null for unsupported node types
  };

  return options.html.map((el: any) => traverse(el));
}
