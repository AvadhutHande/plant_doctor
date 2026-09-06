import { useNavigate } from 'react-router';
import SoilAnalysis from '../components/SoilAnalysis';
import { useField } from '../layouts/AppLayout';

export default function SoilAnalysisPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <SoilAnalysis selectedField={selectedField} onBack={() => navigate(-1)} />;
}
