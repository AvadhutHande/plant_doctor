import { useNavigate } from 'react-router';
import DiseaseDetection from '../components/DiseaseDetection';

export default function DiseaseDetectionPage() {
  const navigate = useNavigate();
  return <DiseaseDetection onBack={() => navigate(-1)} />;
}
