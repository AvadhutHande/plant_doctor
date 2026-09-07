import { useNavigate } from 'react-router';
import ExpenseTracker from '../components/ExpenseTracker';
import { useField } from '../layouts/AppLayout';

export default function ExpenseTrackerPage() {
  const navigate = useNavigate();
  const { selectedField } = useField();
  
  return <ExpenseTracker selectedField={selectedField} onBack={() => navigate(-1)} />;
}
