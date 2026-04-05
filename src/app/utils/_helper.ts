export const validator = (data: any) => {
  if (!Array.isArray(data.items)) {
    return { isValid: false, message: "Items must be an array" };
  }

  return { isValid: true, message: "" };
};

export const generateId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `ORD-${year}${month}${day}-${random}`;
};
