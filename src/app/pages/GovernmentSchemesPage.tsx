import { useNavigate } from 'react-router';
import GovernmentSchemes from '../components/GovernmentSchemes';

export default function GovernmentSchemesPage() {
  const navigate = useNavigate();
  
  return <GovernmentSchemes onBack={() => navigate(-1)} />;
}
