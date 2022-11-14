import './App.css';
import Profile from './pages/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HeaderComponent from './components/header/header.component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Purchases from './components/purchases/purchases.components';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/profile",
    element: <Profile/>,
  },{
    path: "/purchases",
    element: <Purchases/>,
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
