export const dateFormat = (input: string, withoutYear = true) => {
  const date = new Date(input);

  let options: any = { day: '2-digit', month: 'long' };
  if (!withoutYear) {
    options = { ...options, year: 'numeric' };
  }

  return date.toLocaleDateString('es-CL', options).replace('-', ' de ');
};
