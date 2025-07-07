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
  Shield,
  FileText,
  Users,
  MessageSquare,
  ExternalLink,
  Facebook,
  Instagram,
  Youtube,
  Settings  // Added Settings icon for admin panel
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
    { name: 'NEWS', path: '/news', icon: FileText },
    { name: 'ABOUT', path: '/', icon: Home },
    { name: 'REGISTRATION', path: '/register', icon: UserPlus },
    { name: 'FILES', path: '/downloads', icon: Download },
    { name: 'RANKINGS', path: '/rankings', icon: Trophy },
    { name: 'STATISTICS', path: '/server', icon: Server },
    { name: 'FORUMS', path: '/forums', icon: MessageSquare, external: true },
  ];

  const socialLinks = [
    { icon: Youtube, url: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com', color: 'text-red-800' },
    { icon: Facebook, url: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com', color: 'text-blue-800' },
    { icon: Instagram, url: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com', color: 'text-purple-800' },
  ];

  const quickLinks = [
    'Information',
    'Support', 
    'Rules',
    'Guides',
    'Library'
  ];

  const authItems = isAuthenticated ? [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Logout', action: logout, icon: LogOut },
  ] : [
    { name: 'Login', path: '/login', icon: LogIn },
    { name: 'Register', path: '/register', icon: UserPlus },
  ];

  const adminItems = [
    { name: 'Admin Panel', path: '/admin', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  // Check if user has admin privileges
  const isAdminUser = user && (
    (user.gmLevel && user.gmLevel >= 2) || 
    (user.web_admin && user.web_admin >= 2) || 
    user.role === 'admin'
  );

  return (
    <>
      {/* Top Bar with Social and Quick Links */}
      <div className="bg-retro-950 text-gray-400 text-xs py-2 border-b border-retro-800 retro-weathered">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${social.color} hover:opacity-80 transition-opacity`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            
            {/* Quick Links */}
            <div className="hidden md:flex items-center space-x-4">
              {quickLinks.map((link, index) => (
                <a key={index} href="#" className="hover:retro-text-gold transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`retro-nav retro-battle-worn sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-2xl' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-8 w-8 retro-text-gold retro-glow" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold retro-gradient-text retro-glow">
                  MISHKI MU
                </h1>
                <p className="text-xs retro-text-orange -mt-1">Season 19 Episode 2</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href="#"
                    className={`retro-nav-item px-4 py-2 rounded transition-all flex items-center space-x-2 ${
                      isActive(item.path) ? 'active' : ''
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`retro-nav-item px-4 py-2 rounded transition-all flex items-center space-x-2 ${
                      isActive(item.path) ? 'active' : ''
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              ))}

              {/* Admin Panel Link - Shown only for admin users */}
              {isAdminUser && adminItems.map((item) => (
                <a
                  key={item.name}
                  href="http://localhost:4200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-nav-item px-4 py-2 rounded transition-all flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-mu-orange rounded-full retro-pulse"></div>
                    <span className="text-gray-300">Welcome, </span>
                    <span className="retro-text-gold font-semibold retro-glow">{user?.username}</span>
                  </div>
                  
                  {/* Admin Panel Button - Only show for admin users */}
                  {isAdminUser && (
                    <a
                      href="http://localhost:4200"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-button retro-rust px-3 py-1 rounded transition-all flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                      title="Admin Panel"
                    >
                      <Settings className="h-4 w-4" />
                      <span>ADMIN</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  
                  <Link
                    to="/profile"
                    className="retro-button retro-rust px-3 py-1 rounded transition-all flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="retro-button retro-rust px-3 py-1 rounded transition-all flex items-center space-x-1 bg-mu-red hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="retro-button retro-rust px-3 py-1 rounded transition-all flex items-center space-x-1"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>LOGIN</span>
                  </Link>
                  <Link
                    to="/register"
                    className="retro-button retro-rust px-3 py-1 rounded transition-all flex items-center space-x-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>REGISTER</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="retro-nav-item p-2"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4 py-4 space-y-4 border-t border-retro-700 retro-bg retro-weathered">
              {isAuthenticated && (
                <div className="flex items-center space-x-3 text-sm pb-4 border-b border-retro-700">
                  <div className="w-2 h-2 bg-mu-orange rounded-full retro-pulse"></div>
                  <span className="text-gray-300">Welcome, </span>
                  <span className="retro-text-gold font-semibold retro-glow">{user?.username}</span>
                </div>
              )}

              {navigationItems.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="retro-nav-item flex items-center space-x-3 py-2"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`retro-nav-item flex items-center space-x-3 py-2 ${
                      isActive(item.path) ? 'active' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}

              <div className="pt-4 border-t border-retro-700">
                {/* Admin Panel Link for Mobile - Only show for admin users */}
                {isAdminUser && (
                  <a
                    href="http://localhost:4200"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="retro-nav-item flex items-center space-x-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded mb-2"
                  >
                    <Settings className="h-5 w-5" />
                    <span>ADMIN PANEL</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                
                {authItems.map((item) => (
                  item.path ? (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="retro-nav-item flex items-center space-x-3 py-2"
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
                      className="retro-nav-item flex items-center space-x-3 py-2 w-full text-left"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
