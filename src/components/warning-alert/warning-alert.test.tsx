import axios, { AxiosResponse } from 'axios';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WarningAlert from './warning-alert.component';

describe('warning component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('component renders', async () => {
    const queryClient = new QueryClient();
    const mockUser = {
      id_usuario: 1,
      nombre: 'Mercadolibre',
      apellido: 'User',
      nivel: 'ORO',
      imagen:
        'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png',
    };

    const mockRestrictions = {
      data: [
        {
          tipo: 'warning',
          mensaje: 'Tu cuenta no ha sido verificada aún. Revisa tu mail',
        },
      ],
    } as AxiosResponse;
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockRestrictions);

    render(
      <QueryClientProvider client={queryClient}>
        <WarningAlert user={mockUser} />
      </QueryClientProvider>
    );
    expect(await screen.findAllByTestId('warning-alert-message')).toHaveLength(
      1
    );
  });
});
