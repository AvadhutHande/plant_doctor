import Weather from '../components/Weather';
import { useField } from '../layouts/AppLayout';

export default function WeatherPage() {
  const { selectedField } = useField();
  return <Weather selectedField={selectedField} />;
}
