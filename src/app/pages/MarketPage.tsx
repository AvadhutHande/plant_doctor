import Market from '../components/Market';
import { useField } from '../layouts/AppLayout';

export default function MarketPage() {
  const { selectedField } = useField();
  return <Market selectedField={selectedField} />;
}
