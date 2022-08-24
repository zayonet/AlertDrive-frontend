const formatCurrency = (current: number): string => {
  return current.toLocaleString("pt", {
    style: "currency",
    currency: "Eur",
  });
};

export default formatCurrency;
