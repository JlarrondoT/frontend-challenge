import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorComponent from './error.component';

test('component renders', async () => {
  let receivedRetry = false;
  const handleRetry = (retry: boolean) => {
    receivedRetry = retry;
  };
  const component = render(<ErrorComponent retry={handleRetry} />);

  const retryButton = await screen.findAllByTestId('retry-button');

  fireEvent.click(retryButton[0]);
  expect(receivedRetry).toBe(true);
  expect(component).toBeTruthy();
});
