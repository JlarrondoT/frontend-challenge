import axios, { AxiosResponse } from 'axios';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Paginator from './paginator.component';

describe('paginator-component test', () => {
  test('component mounts', () => {
    const queryClient = new QueryClient();

    const handleStateChanger = (input: any) => {};

    const component = render(
      <QueryClientProvider client={queryClient}>
        <Paginator
          itemsPerPage={5}
          total={10}
          stateChanger={handleStateChanger}
        />
      </QueryClientProvider>
    );

    expect(component).toBeTruthy();
  });

  test('component waits for props', () => {
    const queryClient = new QueryClient();

    const handleStateChanger = (input: any) => {
      console.log(input);
    };

    const component = render(
      <QueryClientProvider client={queryClient}>
        <Paginator
          itemsPerPage={undefined}
          total={undefined}
          stateChanger={handleStateChanger}
        />
      </QueryClientProvider>
    );

    expect(component).toBeTruthy();
  });

  test('component changes page', async () => {
    const queryClient = new QueryClient();

    const handleStateChanger = (input: any) => {};

    const component = render(
      <QueryClientProvider client={queryClient}>
        <Paginator
          itemsPerPage={5}
          total={10}
          stateChanger={handleStateChanger}
        />
      </QueryClientProvider>
    );

    const buttonLeft = await screen.findAllByTestId('arrow-left');
    const buttonRight = await screen.findAllByTestId('arrow-right');
    const pageSelector1 = await screen.findAllByTestId('page-selector-0');
    const pageSelector2 = await screen.findAllByTestId('page-selector-1');

    fireEvent.click(buttonLeft[0]);
    expect(pageSelector1[0].className).toEqual('actual-page');
    //expect(component.container.innerHTML.classList.contains('foo'))
    fireEvent.click(buttonRight[0]);
    expect(pageSelector2[0].className).toEqual('actual-page');
    //expect to page-selector-2 has active-class
    fireEvent.click(buttonLeft[0]);
    expect(pageSelector1[0].className).toEqual('actual-page');

    fireEvent.click(pageSelector2[0]);
    expect(pageSelector2[0].className).toEqual('actual-page');
  });
});
