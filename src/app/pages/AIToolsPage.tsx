import AITools from '../components/AITools';
import { useField } from '../layouts/AppLayout';

export default function AIToolsPage() {
  const { selectedField } = useField();
  return <AITools selectedField={selectedField} />;
}
