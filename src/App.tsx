import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HeaderComponent from './components/header/header.component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Purchases from './pages/purchases/purchases.component';
import Profile from './pages/profile/profile.component';
import PurchasesDetail from './pages/purchase-detail/puchase-detail.component';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/purchases",
    element: <Purchases/>,
  },
  {
    path: "/purchase-detail",
    element: <PurchasesDetail/>,
  }
]);

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <HeaderComponent />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
