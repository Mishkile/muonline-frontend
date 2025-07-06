import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Trophy, 
  Server, 
  Download, 
  LogIn, 
  UserPlus,
  User,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Rankings', path: '/rankings', icon: Trophy },
    { name: 'Server Status', path: '/server', icon: Server },
    { name: 'Downloads', path: '/downloads', icon: Download },
  ];

  const authItems = isAuthenticated ? [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Logout', action: logout, icon: LogOut },
  ] : [
    { name: 'Login', path: '/login', icon: LogIn },
    { name: 'Register', path: '/register', icon: UserPlus },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`nav-classic fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-opacity-95' : 'bg-opacity-80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 animate-glow" style={{ color: '#d4af37' }} />
              <div className="absolute inset-0 animate-pulse">
                <Shield className="h-8 w-8" style={{ color: '#d4af37', opacity: 0.3 }} />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl mu-title font-bold">
                DV-Team MU
              </h1>
              <p className="text-xs mu-subtitle -mt-1">Season 19.2.3</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link flex items-center space-x-2 ${
                  isActive(item.path) ? 'active' : ''
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="mu-text">Welcome, </span>
                <span className="gradient-text font-semibold">{user?.username}</span>
              </div>
            )}

            {authItems.map((item) => (
              item.path ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className="nav-link flex items-center space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="nav-link flex items-center space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-link p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 nav-classic ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 space-y-4 border-t border-gold-600">
            {isAuthenticated && (
              <div className="flex items-center space-x-3 text-sm pb-4 border-b border-gold-600">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="mu-text">Welcome, </span>
                <span className="gradient-text font-semibold">{user?.username}</span>
              </div>
            )}

            {[...navigationItems, ...authItems].map((item) => (
              item.path ? (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`nav-link flex items-center space-x-3 py-2 ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="nav-link flex items-center space-x-3 py-2 w-full text-left"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
