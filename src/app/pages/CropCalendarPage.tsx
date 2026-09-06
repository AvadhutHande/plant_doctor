import { useNavigate } from 'react-router';
import CropCalendar from '../components/CropCalendar';
import { useField } from '../layouts/AppLayout';

export default function CropCalendarPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <CropCalendar selectedField={selectedField} onBack={() => navigate(-1)} />;
}
