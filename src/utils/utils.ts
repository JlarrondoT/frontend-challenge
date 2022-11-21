export const dateFormat = (input: string, withoutYear = true) => {
  const date = new Date(input);

  let options: any = { day: '2-digit', month: 'long' };
  if (!withoutYear) {
    options = { ...options, year: 'numeric' };
  }

  return date.toLocaleDateString('es-CL', options).replace('-', ' de ');
};

export const setQuantityText = (quantity: number) => {
  return quantity > 1 ? 'unidades' : 'unidad';
};

export const currencyFormat = (value: number) => {
  return value.toLocaleString('es-ar', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  });
};
