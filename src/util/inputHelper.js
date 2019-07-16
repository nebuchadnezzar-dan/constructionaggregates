export const status = [
  { value: 'maintenance', displayValue: 'Maintenance' },
  { value: 'delivering', displayValue: 'Delivering' },
  { value: 'other', displayValue: 'Other' }
];

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
  amount: '',
  price: ''
});
