import ReactSelect, { createFilter, components } from 'react-select';
import { STYLES } from '@/components/SelectField/constanta';
import styles from './select.module.scss';

/**
 * Render SelectField
 * @param {Object} props
 * @param {String} props.label Define Selectfield label
 * @param {String} props.name Define Selectfield name
 * @returns SelectField component
 */

export default function SelectField(props) {
  const { label, name, ...rest } = props;

  return (
    <div className={styles.root}>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        {...rest}
        components={{
          IndicatorsContainer,
          Input,
          SingleValue,
          Placeholder,
          Option,
        }}
        filterOption={createFilter({ ignoreAccents: false })}
        id={name}
        instanceId={name}
        styles={STYLES}
        isSearchable={false}
        // menuIsOpen
      />
    </div>
  );
}

function IndicatorsContainer(props) {
  return (
    <components.IndicatorsContainer
      {...props}
      className={styles.indicatorsContainer}
    >
      <p>↓</p>
    </components.IndicatorsContainer>
  );
}

function Input(props) {
  const { children } = props;

  return (
    <components.Input {...props} className={styles.input}>
      {children}
    </components.Input>
  );
}

function SingleValue(props) {
  const { children } = props;

  return (
    <components.SingleValue {...props} className={styles.singleValue}>
      {children}
    </components.SingleValue>
  );
}

function Placeholder(props) {
  const { children } = props;

  return (
    <components.Placeholder {...props} className={styles.placeholder}>
      {children}
    </components.Placeholder>
  );
}

function Option(props) {
  const { children } = props;

  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;

  return <components.Option {...props}>{children}</components.Option>;
}
