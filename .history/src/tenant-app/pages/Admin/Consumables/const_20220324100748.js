const formatCurrency = (value) => {
  return value.toLocaleString("en-GH", {
    style: "currency",
    currency: "GHS",
  });
};

export const priceBodyTemplate = (rowData) => {
  return formatCurrency(rowData.unit_price);
};
