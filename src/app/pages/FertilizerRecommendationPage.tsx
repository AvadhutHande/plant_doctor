import { useNavigate } from 'react-router';
import FertilizerRecommendation from '../components/FertilizerRecommendation';
import { useField } from '../layouts/AppLayout';

export default function FertilizerRecommendationPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <FertilizerRecommendation selectedField={selectedField} onBack={() => navigate(-1)} />;
}
