import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import ProfileSummary from './profile-summary.component';

describe('profile-summary component', () => {
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
      data: {
        id_nivel: 'ORO',
        descripción: 'Nivel Oro - Mercadopuntos',
      },
    } as AxiosResponse;
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockRestrictions);

    const component = render(
      <QueryClientProvider client={queryClient}>
        <ProfileSummary user={mockUser} />
      </QueryClientProvider>
    );
    expect(
      await screen.findByText('Nivel Oro - Mercadopuntos')
    ).toBeInTheDocument();
  });
});
