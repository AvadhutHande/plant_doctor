import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { ErrorBoundaryWrapper } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundaryWrapper>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </ErrorBoundaryWrapper>
  );
}