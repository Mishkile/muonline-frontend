import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar_mux';
import Footer from './components/layout/Footer_mux';
import Home from './pages/Home_mux';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Rankings from './pages/Rankings';
import ServerStatus from './pages/ServerStatus';
import PlayerProfile from './pages/PlayerProfile';
import GuildProfile from './pages/GuildProfile';
import Downloads from './pages/Downloads';
import NotFound from './pages/NotFound';
import { useAuth } from './contexts/AuthContext';
import LoadingScreen from './components/ui/LoadingScreen';

const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen retro-bg text-white">
      <Navbar />
      <main className="">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              } 
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/server" element={<ServerStatus />} />
            <Route path="/player/:playerName" element={<PlayerProfile />} />
            <Route path="/guild/:guildName" element={<GuildProfile />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
