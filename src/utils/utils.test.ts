import { dateFormat, setQuantityText, currencyFormat } from './utils';

test('should format date', () => {
  const formattedDate = dateFormat('2022-07-25T10:23:18.000-03:00');
  expect(formattedDate).toEqual('25 de julio');
});

test('should format date with year', () => {
  const formattedDate = dateFormat('2022-07-25T10:23:18.000-03:00', false);
  expect(formattedDate).toEqual('25 de julio de 2022');
});

test('should set quantity text', () => {
  const quantityText1 = setQuantityText(1);
  const quantityText2 = setQuantityText(2);

  expect(quantityText1).toEqual('unidad');
  expect(quantityText2).toEqual('unidades');
});

test('should format currency ARG', () => {
  const formattedCurrency = currencyFormat(105000);
  expect(formattedCurrency.includes('105.000,00')).toBeTruthy();
});
