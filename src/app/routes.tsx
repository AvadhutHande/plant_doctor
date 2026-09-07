import { createMemoryRouter, Navigate } from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import WeatherPage from './pages/WeatherPage';
import AIToolsPage from './pages/AIToolsPage';
import MarketPage from './pages/MarketPage';
import ProfilePage from './pages/ProfilePage';
import FieldDetailsPage from './pages/FieldDetailsPage';
import FieldManagementPage from './pages/FieldManagementPage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import SoilAnalysisPage from './pages/SoilAnalysisPage';
import CropRecommendationPage from './pages/CropRecommendationPage';
import FertilizerRecommendationPage from './pages/FertilizerRecommendationPage';
import SmartAdvisoryPage from './pages/SmartAdvisoryPage';
import MarketPricesPage from './pages/MarketPricesPage';
import IncomeComparisonPage from './pages/IncomeComparisonPage';
import GovernmentSchemesPage from './pages/GovernmentSchemesPage';
import ExpenseTrackerPage from './pages/ExpenseTrackerPage';
import CropCalendarPage from './pages/CropCalendarPage';
import EditProfilePage from './pages/EditProfilePage';
import SettingsPage from './pages/SettingsPage';
import CarbonCreditsPage from './pages/CarbonCreditsPage';
import ErrorBoundaryTest from './components/ErrorBoundaryTest';
import FarmOverviewPage from './pages/FarmOverviewPage';
import { ProfileProvider } from './contexts/ProfileContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { FieldsProvider } from './contexts/FieldsContext';

// Wrapper component that provides all contexts for the app routes
function AppWithProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <LanguageProvider>
        <FieldsProvider>
          {children}
        </FieldsProvider>
      </LanguageProvider>
    </ProfileProvider>
  );
}

export const router = createMemoryRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/farm-overview',
    element: (
      <AppWithProviders>
        <FarmOverviewPage />
      </AppWithProviders>
    ),
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/app',
    element: (
      <AppWithProviders>
        <AppLayout />
      </AppWithProviders>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/app/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'dashboard/field-details',
        element: <FieldDetailsPage />,
      },
      {
        path: 'dashboard/field-management',
        element: <FieldManagementPage />,
      },
      {
        path: 'weather',
        element: <WeatherPage />,
      },
      {
        path: 'ai-tools',
        element: <AIToolsPage />,
      },
      {
        path: 'ai-tools/disease-detection',
        element: <DiseaseDetectionPage />,
      },
      {
        path: 'ai-tools/soil-analysis',
        element: <SoilAnalysisPage />,
      },
      {
        path: 'ai-tools/crop-recommendation',
        element: <CropRecommendationPage />,
      },
      {
        path: 'ai-tools/fertilizer',
        element: <FertilizerRecommendationPage />,
      },
      {
        path: 'ai-tools/advisory',
        element: <SmartAdvisoryPage />,
      },
      {
        path: 'ai-tools/carbon-credits',
        element: <CarbonCreditsPage />,
      },
      {
        path: 'market',
        element: <MarketPage />,
      },
      {
        path: 'market/prices',
        element: <MarketPricesPage />,
      },
      {
        path: 'market/income-comparison',
        element: <IncomeComparisonPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'profile/edit',
        element: <EditProfilePage />,
      },
      {
        path: 'profile/settings',
        element: <SettingsPage />,
      },
      {
        path: 'schemes',
        element: <GovernmentSchemesPage />,
      },
      {
        path: 'expenses',
        element: <ExpenseTrackerPage />,
      },
      {
        path: 'calendar',
        element: <CropCalendarPage />,
      },
      {
        path: 'test/error-boundary',
        element: <ErrorBoundaryTest />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);