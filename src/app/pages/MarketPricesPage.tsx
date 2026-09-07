import { useNavigate } from 'react-router';
import MarketPricesEnhanced from '../components/MarketPricesEnhanced';
import { useField } from '../layouts/AppLayout';

export default function MarketPricesPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <MarketPricesEnhanced selectedField={selectedField} onBack={() => navigate(-1)} />;
}
