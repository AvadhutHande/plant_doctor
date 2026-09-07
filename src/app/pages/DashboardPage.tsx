import Dashboard from '../components/Dashboard';
import { useField } from '../layouts/AppLayout';

export default function DashboardPage() {
  const { selectedField } = useField();
  return <Dashboard selectedField={selectedField} />;
}
