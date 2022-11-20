import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import PurchaseStatus from './purchase-status.component';

describe('purchase-status component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('shipment-status', async () => {
    const queryClient = new QueryClient();
    const mockPurchase = {
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
    };

    const mockPayment = {
      data: {
        id_transaccion: 7010191,
        estado: 'realizada',
      },
    } as AxiosResponse;

    const mockShipment = {
      data: {
        id_envio: 1000010195,
        estado: 'cancelado',
      },
    } as AxiosResponse;

    const mockGet = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce(mockShipment);

    mockGet.mockImplementation((url) => {
      if (url.includes('/api/v1/payment/')) {
        return Promise.resolve(mockPayment);
      } else {
        return Promise.resolve(mockShipment);
      }
    });

    const component = render(
      <QueryClientProvider client={queryClient}>
        <PurchaseStatus purchase={mockPurchase} />
      </QueryClientProvider>
    );
    expect(await screen.findByTestId('shipment-status')).toBeInTheDocument();
    expect(await screen.findByTestId('payment-status')).toBeInTheDocument();
  });
});
