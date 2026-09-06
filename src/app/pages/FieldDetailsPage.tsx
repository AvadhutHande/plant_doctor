import { useNavigate } from 'react-router';
import FieldDetails from '../components/FieldDetails';
import { useField } from '../layouts/AppLayout';

export default function FieldDetailsPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <FieldDetails selectedField={selectedField} onBack={() => navigate(-1)} />;
}
