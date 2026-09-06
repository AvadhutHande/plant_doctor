import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sprout, User, Lock, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would register the user here
    navigate('/login');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-500 to-green-700 overflow-auto">
      <div className="w-full max-w-md space-y-6 py-8">
        {/* Logo */}
        <div className="text-center text-white space-y-4">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Sprout className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl">Farmer Registration</h1>
        </div>

        {/* Registration Form */}
        <Card className="p-6 space-y-6 shadow-xl">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl text-gray-800">Create Account</h2>
            <p className="text-gray-600">Join the smart farming community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Village/Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your village"
                  value={formData.village}
                  onChange={(e) => handleChange('village', e.target.value)}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg bg-green-600 hover:bg-green-700">
              Register
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-green-600 hover:underline"
            >
              Already have an account? Login
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}