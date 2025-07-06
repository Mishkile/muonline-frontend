import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  Shield,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔍 Form submitted with data:', formData);
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    setLoading(true);

    try {
      console.log('🚀 Attempting login...');
      console.log('📡 API Base URL:', import.meta.env.VITE_API_URL || 'http://localhost:3001/api');
      
      const result = await login(formData.username, formData.password);
      console.log('📝 Login result:', result);
      
      if (result.success) {
        console.log('✅ Login successful! Navigating to:', from);
        navigate(from, { replace: true });
      } else {
        console.error('❌ Login failed:', result.error);
        setErrors({ general: result.error });
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (errors[name] || errors.general) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
      `
    }}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="h-16 w-16 text-gold-400 animate-pulse" style={{ color: '#d4af37' }} />
              <div className="absolute inset-0 h-16 w-16 animate-ping">
                <Shield className="h-16 w-16 text-gold-400" style={{ color: '#d4af37', opacity: 0.3 }} />
              </div>
            </div>
          </div>
          <h2 className="hero-title text-4xl">
            Warriors Portal
          </h2>
          <p className="mt-2 mu-subtitle text-lg">
            Enter the realm of DV-Team MU Online
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errors.general}
                </p>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mu-text mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#8b6914' }} />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`form-input pl-10 ${errors.username ? 'border-red-500' : ''}`}
                  placeholder="Enter your username"
                  autoFocus
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.username}
                </p>
              )}
              <p className="mt-1 text-xs text-gold-300 opacity-80">
                Login is case-insensitive (e.g., "Admin" = "admin")
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mu-text mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#8b6914' }} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gold-300"
                  style={{ color: '#8b6914' }}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm nav-link">
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {loading ? (
                <div className="loading-spinner mr-2"></div>
              ) : (
                <LogIn className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Entering...' : 'Enter the Realm'}
            </button>

            {/* Register Link */}
            <div className="text-center text-sm">
              <span className="mu-text">New warrior?</span>{' '}
              <Link to="/register" className="nav-link font-medium">
                Join the Battle
              </Link>
            </div>
          </form>
        </div>

        {/* Quick Start Info */}
        <div className="card-glass text-center">
          <h3 className="mu-title text-xl mb-2">Season 19 Part 2-3</h3>
          <p className="text-sm mu-text mb-4">
            Experience legendary adventures with enhanced rates and exclusive content.
          </p>
          <div className="flex justify-center space-x-6 text-xs">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">1000x</div>
              <div className="mu-subtitle">EXP Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">30%</div>
              <div className="mu-subtitle">Drop Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <div className="mu-subtitle">Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
