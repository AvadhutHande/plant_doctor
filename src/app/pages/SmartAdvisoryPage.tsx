import { useNavigate } from 'react-router';
import SmartAdvisory from '../components/SmartAdvisory';
import { useField } from '../layouts/AppLayout';

export default function SmartAdvisoryPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <SmartAdvisory selectedField={selectedField} onBack={() => navigate(-1)} />;
}
