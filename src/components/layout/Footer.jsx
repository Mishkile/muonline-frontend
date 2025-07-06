import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Heart, 
  Github, 
  Mail, 
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Register', path: '/register' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'Downloads', path: '/downloads' },
  ];

  const gameInfo = [
    { name: 'Server Rules', path: '/rules' },
    { name: 'Game Guide', path: '/guide' },
    { name: 'Events', path: '/events' },
    { name: 'Support', path: '/support' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'YouTube', icon: Youtube, url: '#' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary-500" />
              <div>
                <h3 className="text-xl font-display font-bold gradient-text">
                  DV-Team MU
                </h3>
                <p className="text-sm text-gray-400">Season 19 Part 2-3</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Join the ultimate MU Online experience with custom features, 
              active community, and professional management. Adventure awaits!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Game Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Game Info</h4>
            <ul className="space-y-2">
              {gameInfo.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Server Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Server Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span>Global Server</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4 text-primary-500" />
                <a href="mailto:support@dvteam-mu.com" className="hover:text-primary-400">
                  support@dvteam-mu.com
                </a>
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Version:</strong> Season 19 Part 2-3
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Experience:</strong> 1000x
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Drop Rate:</strong> 30%
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} DV-Team MU Online. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by DV-Team</span>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              This site is not affiliated with or endorsed by Webzen Inc. 
              MU Online is a trademark of Webzen Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
