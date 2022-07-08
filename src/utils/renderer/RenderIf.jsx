import { cloneElement } from 'react';

/**
 * Render element conditionally
 * @param {Object} props
 * @param {Fragment | ForwardedRef | Object} props.render Define element tobe rendered
 * @param {Object} props.when Define when to render the element
 * @param {Object} props.rest Define infinity key
 * @returns Rendered element
 */

export default function RenderIF(props) {
  const { render: Render, when, ...rest } = props;

  if (!when) return null;

  switch (typeof Render) {
    case 'object':
      const isRest = Object.keys(rest).length > 0;

      if (isRest) {
        return cloneElement(Render, { ...rest });
      }

      return Render;
    case 'function':
      return <Render {...rest} />;
    default:
      return <p>RenderIF not support rendering current render props</p>;
  }
}
