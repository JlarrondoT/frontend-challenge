import axios, { AxiosResponse } from 'axios';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Paginator from './paginator.component';

describe('paginator-component test', () => {
  test('component mounts', () => {
    const queryClient = new QueryClient();

    const handleStateChanger = (input: any) => {
      console.log(input);
    };

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
});
