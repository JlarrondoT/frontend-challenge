import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import Purchases from './purchases.component';

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

    const mockPurchases = {
      data: {
        total: 10,
        offset: '0',
        limit: '2',
        data: [
          {
            id_compra: 300200,
            titulo: 'Celular LG K40',
            precio: {
              total: 105000,
              moneda: 'ARS',
            },
            cantidad: 3,
            fecha: '2022-07-25T10:23:18.000-03:00',
            imagen:
              'https://http2.mlstatic.com/D_NQ_NP_969645-MLA46877067884_072021-V.webp',
            vendedor: {
              id: 4010,
              nickname: 'FAROCUDR19',
            },
            id_transaccion: 7010200,
            id_envio: 1000010200,
          },
          {
            id_compra: 300199,
            titulo:
              'Apple iPhone 13 Pro Max 2565gb-incluye Cargador -1 Año Gtia.',
            precio: {
              total: 629999.99,
              moneda: 'ARS',
            },
            cantidad: 1,
            fecha: '2022-07-25T10:03:18.000-03:00',
            imagen:
              'https://http2.mlstatic.com/D_NQ_NP_753104-MLA47778455981_102021-V.webp',
            vendedor: {
              id: 4009,
              nickname: 'ELECTROMIAMI123',
            },
            id_transaccion: 7010199,
            id_envio: 1000010199,
          },
        ],
      },
    } as AxiosResponse;

    const mockGet = jest.spyOn(axios, 'get');

    mockGet.mockImplementation((url) => {
      if (url.includes('purchases')) {
        return Promise.resolve(mockPurchases);
      } else {
        return Promise.resolve(mockUser);
      }
    });

    const component = render(
      <QueryClientProvider client={queryClient}>
        <Purchases />
      </QueryClientProvider>
    );

    const myPurchasesNavigate = await screen.findAllByTestId(
      'purchase-detail-navigate'
    );
    fireEvent.click(myPurchasesNavigate[0]);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/purchase-detail', {
      replace: true,
      state: {
        id_compra: 300200,
        titulo: 'Celular LG K40',
        precio: {
          total: 105000,
          moneda: 'ARS',
        },
        cantidad: 3,
        fecha: '2022-07-25T10:23:18.000-03:00',
        imagen:
          'https://http2.mlstatic.com/D_NQ_NP_969645-MLA46877067884_072021-V.webp',
        vendedor: {
          id: 4010,
          nickname: 'FAROCUDR19',
        },
        id_transaccion: 7010200,
        id_envio: 1000010200,
      },
    });

    expect(component).toBeTruthy();
  });
});
