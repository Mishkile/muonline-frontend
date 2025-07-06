import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
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
                className={`navbar-link flex items-center space-x-2 ${
                  isActive(item.path) ? 'active' : ''
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full online-pulse"></div>
                <span className="text-gray-300">Welcome, </span>
                <span className="text-primary-400 font-semibold">{user?.username}</span>
              </div>
            )}
            
            {authItems.map((item) => (
              item.path ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`navbar-link flex items-center space-x-2 ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="navbar-link flex items-center space-x-2"
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
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.3 }
          },
          closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3 }
          }
        }}
        className="md:hidden overflow-hidden bg-dark-900/95 backdrop-blur-md border-b border-dark-700"
      >
        <div className="px-4 py-4 space-y-4">
          {isAuthenticated && (
            <div className="flex items-center space-x-3 text-sm pb-4 border-b border-dark-700">
              <div className="w-2 h-2 bg-green-500 rounded-full online-pulse"></div>
              <span className="text-gray-300">Welcome, </span>
              <span className="text-primary-400 font-semibold">{user?.username}</span>
            </div>
          )}

          {[...navigationItems, ...authItems].map((item) => (
            item.path ? (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`navbar-link flex items-center space-x-3 py-2 ${
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
                className="navbar-link flex items-center space-x-3 py-2 w-full text-left"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
