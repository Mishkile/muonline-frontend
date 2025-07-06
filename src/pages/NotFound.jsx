import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Card className="p-12 max-w-md mx-auto">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-8xl font-bold text-gold-400 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="space-y-4">
              <Link to="/">
                <Button className="w-full bg-gold-500 hover:bg-gold-600">
                  Return Home
                </Button>
              </Link>
              <Link to="/rankings">
                <Button variant="outline" className="w-full">
                  View Rankings
                </Button>
              </Link>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;
