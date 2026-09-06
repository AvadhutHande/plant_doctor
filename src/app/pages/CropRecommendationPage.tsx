import { useNavigate } from 'react-router';
import CropRecommendation from '../components/CropRecommendation';
import { useField } from '../layouts/AppLayout';

export default function CropRecommendationPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <CropRecommendation selectedField={selectedField} onBack={() => navigate(-1)} />;
}
