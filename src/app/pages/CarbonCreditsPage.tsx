import CarbonCredits from '../components/CarbonCredits';
import { useField } from '../layouts/AppLayout';

export default function CarbonCreditsPage() {
  const { selectedField } = useField();
  return <CarbonCredits selectedField={selectedField} />;
}
