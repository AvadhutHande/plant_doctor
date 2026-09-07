import { useNavigate } from 'react-router';
import IncomeComparison from '../components/IncomeComparison';
import { useField } from '../layouts/AppLayout';

export default function IncomeComparisonPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <IncomeComparison selectedField={selectedField} onBack={() => navigate(-1)} />;
}
