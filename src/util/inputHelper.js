export const selectOptions = (value, displayValue) => ({
  value,
  displayValue
});

export const formFunction = (
  elementType,
  type,
  placeholder,
  options,
  validation,
  valid
) => {
  let elementConfig, value;
  switch (elementType) {
    case 'input':
      elementConfig = {
        type,
        placeholder
      };
      break;
    case 'select':
      elementConfig = {
        options
      };
      value = options[0].value;
      break;
    default:
      elementConfig = null;
  }
  return {
    elementType,
    elementConfig,
    value
  };
};

export const supplySet = () => ({
  active: false,
  amount: 0,
  value: ''
});
