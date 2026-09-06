import { useNavigate } from 'react-router';
import Profile from '../components/Profile';

export default function ProfilePage() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return <Profile onLogout={handleLogout} />;
}
