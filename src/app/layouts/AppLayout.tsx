import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, CloudRain, Sprout, TrendingUp, User, ChevronDown } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Field, FieldContextType } from '../types';
import { useFields } from '../contexts/FieldsContext';
import { useLanguage } from '../contexts/LanguageContext';

const FieldContext = createContext<FieldContextType | null>(null);

export function useField() {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error('useField must be used within AppLayout');
  }
  return context;
}

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fields } = useFields();
  const { t } = useLanguage();
  const [selectedField, setSelectedField] = useState<Field>(fields[0] || {
    id: '1',
    name: 'Field 1',
    size: '0 Guntha',
    area: 0,
    crop: 'Fallow',
    stage: 'Fallow',
    isActive: false,
  });
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected field when fields change
  useEffect(() => {
    if (fields.length > 0) {
      // If current selected field still exists, keep it selected
      const currentField = fields.find(f => f.id === selectedField.id);
      if (currentField) {
        setSelectedField(currentField);
      } else {
        // Otherwise, select the first field
        setSelectedField(fields[0]);
      }
    }
  }, [fields]);

  // Check authentication (simplified - in real app, use proper auth state)
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!showFieldSelector) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFieldSelector(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowFieldSelector(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showFieldSelector]);

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (location.pathname.includes('/dashboard')) return 'dashboard';
    if (location.pathname.includes('/weather')) return 'weather';
    if (location.pathname.includes('/ai-tools')) return 'ai-tools';
    if (location.pathname.includes('/market')) return 'market';
    if (location.pathname.includes('/profile') || 
        location.pathname.includes('/schemes') || 
        location.pathname.includes('/expenses') || 
        location.pathname.includes('/calendar')) return 'profile';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  return (
    <FieldContext.Provider value={{ selectedField, setSelectedField }}>
      <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-amber-50 max-w-md mx-auto">
        {/* Top App Bar with Field Selector */}
        <header className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
          <div className="p-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Smart Farming</h1>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowFieldSelector(!showFieldSelector)}
                className="flex items-center gap-2 bg-green-700 px-3 py-2 rounded-lg hover:bg-green-800 transition-colors"
                aria-label="Select field"
                aria-expanded={showFieldSelector}
                aria-haspopup="true"
              >
                <span className="text-sm">Field: {selectedField.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFieldSelector ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Field Selector Dropdown */}
              {showFieldSelector && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {fields.map((field) => (
                    <button
                      key={field.id}
                      onClick={() => {
                        setSelectedField(field);
                        setShowFieldSelector(false);
                      }}
                      className={`w-full p-3 text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-0 ${
                        selectedField.id === field.id ? 'bg-green-50' : ''
                      }`}
                      aria-label={`Select ${field.name}`}
                    >
                      <p className="text-sm font-medium text-gray-800">{field.name}</p>
                      <p className="text-xs text-gray-600">{field.size} • {field.crop}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto pb-20">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 shadow-lg max-w-md mx-auto">
          <div className="flex justify-around items-center h-16 px-2">
            <NavItem
              icon={<Home className="w-6 h-6" />}
              label={t('nav.dashboard')}
              active={activeTab === 'dashboard'}
              onClick={() => navigate('/app/dashboard')}
            />
            <NavItem
              icon={<CloudRain className="w-6 h-6" />}
              label={t('nav.weather')}
              active={activeTab === 'weather'}
              onClick={() => navigate('/app/weather')}
            />
            <NavItem
              icon={<Sprout className="w-6 h-6" />}
              label={t('nav.aiTools')}
              active={activeTab === 'ai-tools'}
              onClick={() => navigate('/app/ai-tools')}
            />
            <NavItem
              icon={<TrendingUp className="w-6 h-6" />}
              label={t('nav.market')}
              active={activeTab === 'market'}
              onClick={() => navigate('/app/market')}
            />
            <NavItem
              icon={<User className="w-6 h-6" />}
              label={t('nav.profile')}
              active={activeTab === 'profile'}
              onClick={() => navigate('/app/profile')}
            />
          </div>
        </nav>
      </div>
    </FieldContext.Provider>
  );
}

function NavItem({ icon, label, active, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[64px] ${
        active ? 'text-green-600' : 'text-gray-500'
      }`}
    >
      <div className={active ? 'scale-110 transition-transform' : ''}>
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
}