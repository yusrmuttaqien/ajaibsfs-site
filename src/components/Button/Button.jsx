import concat from '@/utils/string/concat';
import styles from './button.module.scss';

/**
 * Render button
 * @param {Object} props
 * @param {String} props.className Define custom classname
 * @param {Object} props.rest Define infinity key\
 * @returns Button component
 */

export default function Button(props) {
  const { className, ...rest } = props;
  const classes = concat([styles.root, className]);

  return <button {...rest} className={classes} />;
}
