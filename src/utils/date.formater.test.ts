import { dateFormat } from './date.formater';

test('should format date', () => {
  const formattedDate = dateFormat('2022-07-25T10:23:18.000-03:00');
  expect(formattedDate).toEqual('25 de julio');
});

test('should format date with year', () => {
  const formattedDate = dateFormat('2022-07-25T10:23:18.000-03:00', false);
  expect(formattedDate).toEqual('25 de julio de 2022');
});
