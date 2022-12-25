export const abbrevAccount = (account: string) =>
  account.slice(0, 6) + "..." + account.slice(-4);

export const upperFirstChar = (s: string) => {
  if (typeof s !== "string" || s.length < 2) return s;

  return s[0].toUpperCase() + s.slice(1);
};
