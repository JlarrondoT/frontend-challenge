export const dateFormat = (input: string, withYear = true) => {
  const date = new Date(input);

  let options: any = { day: '2-digit', month: 'long' };
  if (!withYear) {
    options = { ...options, year: 'numeric' };
  }

  return date.toLocaleDateString('es-CL', options).replace('-', ' de ');
};
