import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sprout, User, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.removeItem('farmOverviewSeen');
    navigate('/farm-overview');
  };

  const handleDemoLogin = () => {
    setPhone('9876543210');
    setPassword('demo123');
    setTimeout(() => {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.removeItem('farmOverviewSeen');
      navigate('/farm-overview');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-500 to-green-700">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center text-white space-y-4">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Sprout className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl">Smart Farming</h1>
          <p className="text-green-100">AI-Powered Agriculture Advisory</p>
        </div>

        {/* Login Form */}
        <Card className="p-6 space-y-6 shadow-xl">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl text-gray-800">Welcome Back</h2>
            <p className="text-gray-600">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-700">Phone Number</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg bg-green-600 hover:bg-green-700">
              Login
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => navigate('/register')}
              className="text-green-600 hover:underline"
            >
              Don't have an account? Register
            </button>
          </div>
        </Card>

        {/* Demo Access Section */}
        <Card className="p-6 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Demo Access</h3>
              <p className="text-sm text-gray-600 mt-1">Try the app without registration</p>
            </div>
            
            <Button 
              onClick={handleDemoLogin}
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Login as Farmer
            </Button>
          </div>
        </Card>

        <p className="text-center text-green-100 text-sm">
          © 2026 Smart Farming. All rights reserved.
        </p>
      </div>
    </div>
  );
}