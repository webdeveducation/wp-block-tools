import { convertStyleStringToReact } from './convertStyleStringToReact';

export const convertAttributesToReactProps = (attribs: {
  [key: string]: any;
}) => {
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
      } else if (key === 'for') {
        props['htmlFor'] = attribs[key];
      } else if (key === 'tabindex') {
        props['tabIndex'] = attribs[key];
      } else if (key === 'srcset') {
        props['srcSet'] = attribs[key];
      } else if (key === 'value') {
        props['defaultValue'] = attribs[key];
      } else if (key === 'datetime') {
        props['dateTime'] = attribs[key];
      } else {
        props[key] = attribs[key];
      }
    }
  }
  return props;
};
