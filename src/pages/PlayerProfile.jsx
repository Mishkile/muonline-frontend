import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Crown, 
  Sword, 
  Shield, 
  Star,
  Users,
  Calendar,
  MapPin,
  Trophy,
  Target,
  Zap,
  Activity,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { playersAPI } from '../services/api';
import toast from 'react-hot-toast';

const PlayerProfile = () => {
  const { playerName } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerProfile();
  }, [playerName]);

  const fetchPlayerProfile = async () => {
    try {
      const response = await playersAPI.getProfile(playerName);
      console.log('Player profile response:', response.data);
      setPlayerData(response.data);
    } catch (error) {
      console.error('Failed to fetch player profile:', error);
      toast.error(`Player not found: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-gray-700 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-700 rounded"></div>
              <div className="h-64 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <Card className="text-center">
          <User className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Player Not Found</h2>
          <p className="text-gray-400 mb-6">
            The player "{playerName}" could not be found.
          </p>
          <Link to="/rankings">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Rankings
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const { character } = playerData;

  const stats = [
    { label: 'Level', value: character.level || 0, icon: Star, color: 'text-primary-400' },
    { label: 'Resets', value: character.resets || 0, icon: Crown, color: 'text-gold-400' },
    { label: 'Master Level', value: character.masterLevel || 0, icon: Trophy, color: 'text-purple-400' },
    { label: 'PK Count', value: character.pkCount || 0, icon: Sword, color: 'text-red-400' }
  ];

  const attributes = [
    { label: 'Strength', value: character.strength || 0 },
    { label: 'Dexterity', value: character.dexterity || 0 },
    { label: 'Vitality', value: character.vitality || 0 },
    { label: 'Energy', value: character.energy || 0 },
    { label: 'Leadership', value: character.leadership || 0 }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/rankings" 
            className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rankings
          </Link>
          
          <Card variant="gradient">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{character.name}</h1>
                  <p className="text-lg text-gray-300">{character.characterClass || 'Unknown Class'}</p>
                  {character.guild && (
                    <Link 
                      to={`/guild/${character.guild.name}`}
                      className="text-secondary-400 hover:text-secondary-300 flex items-center mt-1"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      {character.guild.name}
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-400">Account Created</div>
                <div className="font-semibold">
                  {character.accountCreated ? new Date(character.accountCreated).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card>
              <h2 className="text-2xl font-bold mb-6">Character Statistics</h2>
              
              {/* Main Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="text-center p-4 bg-dark-700/30 rounded-lg"
                  >
                    <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Character Attributes */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Attributes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attributes.map((attr, index) => (
                    <div key={attr.label} className="flex justify-between items-center p-3 bg-dark-700/30 rounded-lg">
                      <span className="text-gray-300">{attr.label}</span>
                      <span className="font-semibold text-primary-400">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience and Money */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-dark-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Experience</span>
                    <Zap className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div className="text-xl font-bold text-yellow-400">
                    {character.experience?.toLocaleString() || 0}
                  </div>
                </div>
                
                <div className="p-4 bg-dark-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Zen</span>
                    <Star className="h-4 w-4 text-gold-400" />
                  </div>
                  <div className="text-xl font-bold text-gold-400">
                    {character.money?.toLocaleString() || 0}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Account Info */}
            <Card>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 text-primary-500 mr-2" />
                Account Info
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">VIP Status</span>
                  <span className={`font-semibold ${
                    character.vipStatus > 0 ? 'text-gold-400' : 'text-gray-500'
                  }`}>
                    {character.vipStatus > 0 ? `VIP ${character.vipStatus}` : 'Regular'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Credits</span>
                  <span className="font-semibold text-primary-400">
                    {character.credits || 0}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Web Credits</span>
                  <span className="font-semibold text-secondary-400">
                    {character.webCredits || 0}
                  </span>
                </div>
              </div>
            </Card>

            {/* PvP Info */}
            <Card>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Sword className="h-5 w-5 text-red-500 mr-2" />
                PvP Statistics
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">PK Count</span>
                  <span className="font-semibold text-red-400">{character.pkCount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">PK Level</span>
                  <span className={`font-semibold ${
                    character.pkLevel > 3 ? 'text-red-500' : 
                    character.pkLevel > 0 ? 'text-orange-400' : 'text-green-400'
                  }`}>
                    {character.pkLevel === 0 ? 'Normal' :
                     character.pkLevel <= 3 ? 'Murderer' : 'Hero'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-green-500 mr-2" />
                Current Location
              </h3>
              
              <div className="space-y-2">
                <div className="text-gray-400">Map: {character.mapNumber}</div>
                <div className="text-sm text-gray-500">
                  Position: {character.mapPosX}, {character.mapPosY}
                </div>
              </div>
            </Card>

            {/* Guild Info */}
            {character.guild && (
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 text-secondary-500 mr-2" />
                  Guild Information
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <Link 
                      to={`/guild/${character.guild.name}`}
                      className="font-semibold text-secondary-400 hover:text-secondary-300 flex items-center"
                    >
                      {character.guild.name}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Guild Master</span>
                    <Link 
                      to={`/player/${character.guild.guildMaster}`}
                      className="text-primary-400 hover:text-primary-300"
                    >
                      {character.guild.guildMaster}
                    </Link>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="font-semibold text-gold-400">
                      {character.guild.status || 'Member'}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
