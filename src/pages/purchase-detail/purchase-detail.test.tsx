import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PurchaseDetail from './puchase-detail.component';

const mockedUsedNavigate = jest.fn();
const mockUseLocationValue = {
  pathname: '/purchase-detail',
  search: '',
  hash: '',
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
};

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

describe('Profile-page component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('test component mounts', async () => {
    const queryClient = new QueryClient();

    const component = render(
      <QueryClientProvider client={queryClient}>
        <PurchaseDetail />
      </QueryClientProvider>
    );

    const myPurchasesNavigate = await screen.findAllByTestId(
      'purchases-navigate'
    );
    fireEvent.click(myPurchasesNavigate[0]);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/purchases', {
      replace: true,
    });

    expect(component).toBeTruthy();
  });
});
