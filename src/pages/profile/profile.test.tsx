import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import Profile from './profile.component';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Profile-page component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('test component mounts', async () => {
    const queryClient = new QueryClient();
    const mockUser = {
      data: {
        id_usuario: 1,
        nombre: 'Mercadolibre',
        apellido: 'User',
        nivel: 'ORO',
        imagen:
          'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png',
      },
    } as AxiosResponse;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockUser);

    const component = render(
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    );

    const myPurchasesNavigate = await screen.findAllByTestId(
      'purchases-navigate'
    );
    fireEvent.click(myPurchasesNavigate[0]);

    expect(component).toBeTruthy();
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/purchases', {
      replace: true,
    });
  });

  test('test user service error', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          retryDelay: 0,
        },
      },
    });

    jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'));

    const component = render(
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    );

    expect(component).toBeTruthy();
  });
});
