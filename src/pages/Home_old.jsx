import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Download, 
  Users, 
  Trophy, 
  Server, 
  Sword,
  Shield,
  Crown,
  Zap,
  Star,
  ArrowRight,
  User,
  Calendar,
  Target
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { serverAPI, rankingsAPI } from '../services/api';

const Home = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServerData();
  }, []);

  const fetchServerData = async () => {
    try {
      const [statusResponse, playersResponse] = await Promise.all([
        serverAPI.getStatus(),
        rankingsAPI.getPlayers({ limit: 5 })
      ]);

      setServerStatus(statusResponse.data);
      setTopPlayers(playersResponse.data.players);
    } catch (error) {
      console.error('Failed to fetch server data:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Sword,
      title: 'Custom Content',
      description: 'Unique wings, sets, and items exclusive to our server',
      color: 'text-red-500'
    },
    {
      icon: Shield,
      title: 'Anti-Hack Protection',
      description: 'Advanced security systems to ensure fair gameplay',
      color: 'text-blue-500'
    },
    {
      icon: Crown,
      title: 'Castle Siege',
      description: 'Epic guild vs guild battles for castle ownership',
      color: 'text-yellow-500'
    },
    {
      icon: Zap,
      title: 'High Rates',
      description: '1000x EXP, 30% Drop Rate for faster progression',
      color: 'text-purple-500'
    }
  ];

  const events = [
    {
      title: 'Blood Castle',
      time: 'Every 2 hours',
      description: 'Fight through waves of monsters for rare rewards',
      icon: '🏰'
    },
    {
      title: 'Devil Square',
      time: 'Every hour',
      description: 'Survive the devil\'s challenge for experience and items',
      icon: '👹'
    },
    {
      title: 'Chaos Castle',
      time: 'Every 6 hours',
      description: 'Last player standing wins exclusive rewards',
      icon: '⚔️'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 opacity-30"
          >
            <Sword className="h-16 w-16 text-primary-500" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-16 opacity-20"
          >
            <Shield className="h-20 w-20 text-secondary-500" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-20 opacity-25"
          >
            <Crown className="h-12 w-12 text-gold-500" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-shadow-lg">
              <span className="gradient-text">DV-Team</span>
              <br />
              <span className="text-white">MU Online</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 text-shadow"
            >
              Season 19 Part 2-3 • 1000x EXP • Custom Content
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button size="lg" className="text-lg px-8 py-4">
                <Play className="h-5 w-5 mr-2" />
                Start Playing
              </Button>
              <Button variant="ghost" size="lg" className="text-lg px-8 py-4">
                <Download className="h-5 w-5 mr-2" />
                Download Client
              </Button>
            </motion.div>

            {/* Server Stats */}
            {serverStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">
                    {serverStatus.statistics.playersOnline}
                  </div>
                  <div className="text-gray-400 text-sm">Players Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-400">
                    {serverStatus.statistics.totalAccounts}
                  </div>
                  <div className="text-gray-400 text-sm">Total Accounts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {serverStatus.statistics.totalGuilds}
                  </div>
                  <div className="text-gray-400 text-sm">Active Guilds</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-400">
                    {serverStatus.server.rates.experience}
                  </div>
                  <div className="text-gray-400 text-sm">EXP Rate</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Game Features</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the ultimate MU Online adventure with our custom features and professional management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="text-center h-full">
                  <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-20 px-4 bg-dark-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Top Players */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6 flex items-center">
                <Trophy className="h-8 w-8 text-gold-500 mr-3" />
                Top Players
              </h2>
              <Card>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gray-700 rounded"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topPlayers.map((player, index) => (
                      <div key={player.name} className="flex items-center justify-between py-2 border-b border-dark-600 last:border-b-0">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index === 0 ? 'bg-gold-500 text-dark-900' :
                            index === 1 ? 'bg-gray-400 text-dark-900' :
                            index === 2 ? 'bg-amber-600 text-dark-900' :
                            'bg-dark-600 text-gray-300'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <Link 
                              to={`/player/${player.name}`}
                              className="font-semibold hover:text-primary-400 transition-colors"
                            >
                              {player.name}
                            </Link>
                            <div className="text-sm text-gray-400">
                              {player.characterClass} • {player.guildName}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">Level {player.level}</div>
                          <div className="text-sm text-gray-400">{player.resets} Resets</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 text-center">
                  <Link to="/rankings">
                    <Button variant="ghost">
                      View Full Rankings
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Events Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6 flex items-center">
                <Calendar className="h-8 w-8 text-primary-500 mr-3" />
                Events Schedule
              </h2>
              <Card>
                <div className="space-y-6">
                  {events.map((event, index) => (
                    <div key={event.title} className="flex items-start space-x-4">
                      <div className="text-2xl">{event.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <span className="text-sm text-primary-400 bg-primary-500/10 px-2 py-1 rounded">
                            {event.time}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/events">
                    <Button variant="ghost">
                      View All Events
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title mb-6">Ready to Begin Your Adventure?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of players in the ultimate MU Online experience. 
              Create your account today and start your journey to become a legend.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-4">
                  <User className="h-5 w-5 mr-2" />
                  Create Account
                </Button>
              </Link>
              <Link to="/downloads">
                <Button variant="ghost" size="lg" className="text-lg px-8 py-4">
                  <Download className="h-5 w-5 mr-2" />
                  Download Game
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
