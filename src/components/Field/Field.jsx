import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import styles from './field.module.scss';

/**
 * Render Field
 * @param {Object} props
 * @param {Any} props.initialValue Define field first rendered value
 * @param {String} props.label Define field label
 * @param {String} props.name Define field name
 * @param {Function} props.onChange Define field action when change
 * @param {String} props.type Define field type
 * @param {Any} props.value Define field controlled value
 * @param {Object} props.rest Define infinity key
 * @returns Field component
 */

export default function Field(props) {
  const {
    initialValue,
    label,
    name,
    onChange,
    type = 'text',
    value: externalValue,
    ...rest
  } = props;

  const [value, setValue] = useState(_defineInitialValue(type, initialValue));

  const _defineDebounce = useCallback(
    debounce((value) => onChange && onChange(value), 500),
    []
  );

  const _handleOnChange = (e) => {
    setValue(e.target.value);
    _defineDebounce(e.target.value);
  };

  useEffect(() => {
    const init = _defineInitialValue(type, initialValue);

    if (externalValue === init) {
      setValue(init);
    }
  }, [externalValue, type, initialValue]);

  return (
    <div className={styles.root}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={_handleOnChange}
      />
    </div>
  );
}

function _defineInitialValue(type, initialValue) {
  if (initialValue) return initialValue;

  switch (type) {
    case 'text':
    default:
      return '';
    case 'number':
      return 0;
  }
}
