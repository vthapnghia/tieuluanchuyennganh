export const currencyFormatting = (price = 0) => {
  return parseInt(price).toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};
