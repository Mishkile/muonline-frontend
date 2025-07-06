import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Users, 
  Activity, 
  Globe,
  Clock,
  Wifi,
  Database,
  Shield,
  Trophy,
  Crown,
  Gamepad2,
  Zap,
  Calendar,
  MapPin
} from 'lucide-react';
import Card from '../components/ui/Card';
import { serverAPI } from '../services/api';
import toast from 'react-hot-toast';

const ServerStatus = () => {
  const [serverData, setServerData] = useState(null);
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchServerStatus();
    
    // Update every 30 seconds
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchServerStatus = async () => {
    try {
      const [statusResponse, onlineResponse] = await Promise.all([
        serverAPI.getStatus(),
        serverAPI.getOnlinePlayers({ limit: 20 })
      ]);

      console.log('Server status response:', statusResponse.data);
      console.log('Online players response:', onlineResponse.data);

      setServerData(statusResponse.data);
      setOnlinePlayers(onlineResponse.data.players || []);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch server status:', error);
      toast.error(`Failed to load server information: ${error.response?.data?.error || error.message}`);
      
      // Set empty arrays to prevent UI issues
      setOnlinePlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const formatUptime = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = now - start;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-24 bg-gray-700 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      label: 'Players Online',
      value: serverData?.statistics.playersOnline || 0,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Database,
      label: 'Total Accounts',
      value: serverData?.statistics.totalAccounts || 0,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Crown,
      label: 'Active Guilds',
      value: serverData?.statistics.totalGuilds || 0,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Trophy,
      label: 'Total Characters',
      value: serverData?.statistics.totalCharacters || 0,
      color: 'text-gold-500',
      bgColor: 'bg-gold-500/10'
    },
    {
      icon: Zap,
      label: 'Experience Rate',
      value: serverData?.server.rates.experience || '1000x',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Gamepad2,
      label: 'Drop Rate',
      value: serverData?.server.rates.drop || '30%',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title flex items-center justify-center">
            <Server className="h-12 w-12 text-primary-500 mr-4" />
            Server Status
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time server information and statistics for DV-Team MU Online
          </p>
        </motion.div>

        {/* Server Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12"
        >
          <Card variant="gradient" className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full online-pulse mr-3"></div>
              <h2 className="text-2xl font-bold gradient-text">
                {serverData?.server.name} - {serverData?.server.status}
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              {serverData?.server.season} • Max Level {serverData?.server.maxLevel} • Max Resets {serverData?.server.maxResets}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-2">
                <Globe className="h-5 w-5 text-primary-400" />
                <span>Global Server</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5 text-secondary-400" />
                <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Activity className="h-5 w-5 text-green-400" />
                <span>Stable Connection</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="text-center">
                <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Online Players */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Users className="h-6 w-6 text-green-500 mr-3" />
                  Online Players
                </h2>
                <div className="text-sm text-gray-400">
                  {onlinePlayers.length} players shown
                </div>
              </div>

              {onlinePlayers.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {onlinePlayers.map((player, index) => (
                    <div
                      key={player.name}
                      className="flex items-center justify-between p-3 bg-dark-700/30 rounded-lg hover:bg-dark-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full online-pulse"></div>
                        <div>
                          <div className="font-semibold">{player.name}</div>
                          <div className="text-sm text-gray-400">
                            {player.characterClass} • {player.guildName}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold text-primary-400">Lv. {player.level}</div>
                        <div className="text-gray-400">{player.resets} Resets</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No players currently online</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Server Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card>
              <h2 className="text-2xl font-bold flex items-center mb-6">
                <Shield className="h-6 w-6 text-primary-500 mr-3" />
                Server Features
              </h2>

              <div className="space-y-4">
                {serverData?.server.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Recent Events */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-secondary-500 mr-2" />
                  Recent Events
                </h3>
                
                <div className="space-y-3">
                  {serverData?.events.map((event) => (
                    <div key={event.id} className="p-3 bg-dark-700/30 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{event.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          event.type === 'announcement' ? 'bg-blue-500/20 text-blue-400' :
                          event.type === 'event' ? 'bg-green-500/20 text-green-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                      <div className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Castle Siege Info */}
        {serverData?.statistics.castleOwner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8"
          >
            <Card variant="gradient" className="text-center">
              <h2 className="text-2xl font-bold flex items-center justify-center mb-4">
                <Crown className="h-6 w-6 text-gold-500 mr-3" />
                Castle Siege
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-2">Current Owner</h3>
                  <p className="text-2xl font-bold">{serverData.statistics.castleOwner.guildName}</p>
                  <p className="text-gray-400">Master: {serverData.statistics.castleOwner.guildMaster}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-secondary-400 mb-2">Next Siege</h3>
                  <p className="text-xl font-bold">Saturday 21:00</p>
                  <p className="text-gray-400">Weekly Event</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ServerStatus;
