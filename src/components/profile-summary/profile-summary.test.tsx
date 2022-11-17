import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ProfileSummary from "./profile-summary.component";

test("component renders", () => {
  const queryClient = new QueryClient();
  const mockUser = {
    id_usuario: 1,
    nombre: "Mercadolibre",
    apellido: "User",
    nivel: "ORO",
    imagen:
      "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png",
  };

  const component = render(
    <QueryClientProvider client={queryClient}>
      <ProfileSummary user={mockUser} />
    </QueryClientProvider>
  );
  expect(component).toBeTruthy();
});
