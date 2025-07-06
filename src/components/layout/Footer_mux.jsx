import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Mail, 
  ExternalLink,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="retro-bg border-t border-retro-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 retro-text-gold retro-glow" />
              <div>
                <h3 className="text-xl font-bold retro-gradient-text retro-glow">
                  MUX LEGEND
                </h3>
                <p className="text-sm retro-text-orange">Season 20 MU Online</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Experience the ultimate MU Online private server with custom content, 
              enhanced gameplay, and an active community of players.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-red-500 hover:text-red-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold retro-text-gold retro-glow">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-gray-400 hover:retro-text-gold transition-colors text-sm">
                Home
              </Link>
              <Link to="/register" className="text-gray-400 hover:retro-text-gold transition-colors text-sm">
                Register
              </Link>
              <Link to="/rankings" className="text-gray-400 hover:retro-text-gold transition-colors text-sm">
                Rankings
              </Link>
              <Link to="/downloads" className="text-gray-400 hover:retro-text-gold transition-colors text-sm">
                Downloads
              </Link>
              <Link to="/server" className="text-gray-400 hover:retro-text-gold transition-colors text-sm">
                Server Status
              </Link>
              <a href="#" className="text-gray-400 hover:retro-text-gold transition-colors text-sm flex items-center">
                Forums <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold retro-text-gold retro-glow">Support</h4>
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:retro-text-gold transition-colors text-sm block">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:retro-text-gold transition-colors text-sm block">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:retro-text-gold transition-colors text-sm block">
                Game Rules
              </a>
              <a href="#" className="text-gray-400 hover:retro-text-gold transition-colors text-sm block flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-retro-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MUX Legend. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            MU Online is a trademark of Webzen Inc. This server is not affiliated with Webzen.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
