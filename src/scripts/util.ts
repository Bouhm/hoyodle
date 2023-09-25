export const trim = (str: string) => {
  return str.replace(/ /g, "").replace(/[&|•]/, "_").toLowerCase();
}

export const replaceNpcName = (str: string, name: string) => {
  return str.replace(name, '???');
}

export const replacePlayerName = (str: string) => {
  return str.replace('{NICKNAME}', 'Stelle');
}