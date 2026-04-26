// Format number as Indian Rupees
export const formatCurrency = (value) => {
  if (!value && value !== 0) return '₹0';
  return '₹' + Number(value).toLocaleString('en-IN');
};

// Format large numbers with commas
export const formatNumber = (value) => {
  if (!value && value !== 0) return '0';
  return Number(value).toLocaleString('en-IN');
};
