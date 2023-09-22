export const trim = (str: string) => {
  return str.replace(/ /g, "").replace("&", "").toLowerCase();
}