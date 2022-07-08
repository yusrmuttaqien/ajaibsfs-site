export const STYLES = {
  container: (provided /* state */) => {
    return {
      ...provided,
      width: 'var(--input-width)',
      height: 'var(--input-height)',
    };
  },
  control: (provided, state) => {
    const { hasValue, isFocused } = state;

    const _defineBorderColor = () => {
      if (isFocused) return 'var(--color-pink)';
      if (hasValue) return 'var(--color-white)';

      return 'var(--color-white-fade)';
    };

    return {
      ...provided,
      boxShadow: 'none',
      minHeight: 'var(--input-height)',
      height: 'var(--input-height)',
      borderWidth: '0.063rem',
      borderRadius: '0',
      background: 'transparent',
      borderColor: _defineBorderColor(),
      '&:hover': {
        borderColor: _defineBorderColor(),
      },
    };
  },
  valueContainer: (provided /* state */) => {
    return {
      ...provided,
      padding: '0 1rem',
      height: 'var(--input-height)',
    };
  },
  input: (provided /* state */) => {
    return {
      ...provided,
      margin: '0',
      padding: '0',
    };
  },
  placeholder: (provided /* state */) => {
    return {
      ...provided,
      margin: '0',
      color: 'var(--color-white-fader)',
    };
  },
  indicatorSeparator: (provided /* state */) => {
    return {
      ...provided,
      display: 'none',
    };
  },
  indicatorsContainer: (provided, state) => {
    return {
      ...provided,
      height: 'var(--input-height)',
      '> p': {
        padding: '0 1rem 0 0',
        color: 'var(--color-white-fade)',
      },
    };
  },
  singleValue: (provided /* state */) => {
    return {
      ...provided,
      margin: '0',
      color: 'var(--color-white)',
    };
  },
  menu: (provided /* state */) => {
    return {
      ...provided,
      borderRadius: '0',
      background: 'var(--color-black-fade)',
      backdropFilter: 'blur(var(--blur))',
    };
  },
  option: (provided, state) => {
    const { isFocused, isSelected } = state;

    const _defineBgColor = () => {
      if (isSelected) return 'var(--color-pink)';

      return 'transparent';
    };

    return {
      ...provided,
      padding: '.6rem 1rem .6rem 0.5rem',
      backgroundColor: _defineBgColor('normal'),
      borderLeft: '.5rem solid',
      borderColor: isFocused ? 'transparent' : 'var(--color-white)',
      color: isSelected ? 'var(--color-black)' : 'var(--color-white)',
      '&:active': {
        backgroundColor: _defineBgColor(),
      },
    };
  },
};
