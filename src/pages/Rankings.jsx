import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  Crown,
  Sword,
  Shield,
  Star,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Medal,
  User
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { rankingsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Rankings = () => {
  const [activeTab, setActiveTab] = useState('players');
  const [rankingType, setRankingType] = useState('level');
  const [players, setPlayers] = useState([]);
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPlayers: 0,
    playersPerPage: 50
  });

  const tabs = [
    { id: 'players', name: 'Players', icon: User },
    { id: 'guilds', name: 'Guilds', icon: Users }
  ];

  const rankingTypes = [
    { id: 'level', name: 'Level', icon: Star },
    { id: 'resets', name: 'Resets', icon: Crown },
    { id: 'master_level', name: 'Master Level', icon: Medal },
    { id: 'pk', name: 'PK Count', icon: Sword },
    { id: 'online', name: 'Online', icon: Shield }
  ];

  useEffect(() => {
    fetchRankings();
  }, [activeTab, rankingType, pagination.currentPage]);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      if (activeTab === 'players') {
        const response = await rankingsAPI.getPlayers({
          type: rankingType,
          page: pagination.currentPage,
          limit: pagination.playersPerPage
        });
        
        console.log('Players API response:', response.data);
        
        if (response.data && response.data.players) {
          setPlayers(response.data.players);
          setPagination(response.data.pagination);
        } else {
          console.error('Invalid players response structure:', response.data);
          setPlayers([]);
        }
      } else {
        const response = await rankingsAPI.getGuilds({
          page: pagination.currentPage,
          limit: 20
        });
        
        console.log('Guilds API response:', response.data);
        
        if (response.data && response.data.guilds) {
          setGuilds(response.data.guilds);
          setPagination(response.data.pagination);
        } else {
          console.error('Invalid guilds response structure:', response.data);
          setGuilds([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch rankings:', error);
      toast.error(`Failed to load ${activeTab} rankings: ${error.response?.data?.error || error.message}`);
      
      // Set empty arrays to prevent UI issues
      if (activeTab === 'players') {
        setPlayers([]);
      } else {
        setGuilds([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const getClassIcon = (characterClass) => {
    // You can expand this with specific class icons
    return Sword;
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return { icon: Trophy, color: 'text-gold-500' };
    if (rank === 2) return { icon: Medal, color: 'text-gray-400' };
    if (rank === 3) return { icon: Medal, color: 'text-amber-600' };
    return { icon: Star, color: 'text-gray-500' };
  };

  const filteredPlayers = players.filter(player =>
    player.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.guildName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGuilds = guilds.filter(guild =>
    guild.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guild.guildMaster?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Trophy className="h-12 w-12 text-gold-500 mr-4" />
            Rankings
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the strongest warriors and most powerful guilds in DV-Team MU Online
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-dark-800 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setPagination(prev => ({ ...prev, currentPage: 1 }));
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
        >
          {/* Ranking Type Selector (for players only) */}
          {activeTab === 'players' && (
            <div className="flex flex-wrap gap-2">
              {rankingTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setRankingType(type.id);
                    setPagination(prev => ({ ...prev, currentPage: 1 }));
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    rankingType === type.id
                      ? 'bg-secondary-600 text-white'
                      : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  <type.icon className="h-4 w-4" />
                  <span className="text-sm">{type.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
        </motion.div>

        {/* Rankings Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card>
            {loading ? (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center space-x-4 py-4">
                    <div className="w-12 h-12 bg-gray-700 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-4 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : activeTab === 'players' ? (
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-sm text-gray-400 font-semibold pb-4 border-b border-dark-600">
                  <div className="md:col-span-1">Rank</div>
                  <div className="md:col-span-3">Player</div>
                  <div className="md:col-span-2">Class</div>
                  <div className="md:col-span-2">Guild</div>
                  <div className="md:col-span-1">Level</div>
                  <div className="md:col-span-1">Resets</div>
                  <div className="md:col-span-1">ML</div>
                  <div className="md:col-span-1">PK</div>
                </div>
                
                {filteredPlayers.length === 0 ? (
                  <div className="text-center py-8">
                    <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Players Found</h3>
                    <p className="text-gray-400">
                      {searchTerm ? 'No players match your search criteria.' : 'No player data available at the moment.'}
                    </p>
                  </div>
                ) : (
                  filteredPlayers.map((player) => {
                    const rankInfo = getRankIcon(player.rank);
                    const ClassIcon = getClassIcon(player.characterClass);
                    
                    return (
                      <motion.div
                        key={player.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b border-dark-700 last:border-b-0 hover:bg-dark-700/30 transition-colors"
                      >
                        <div className="md:col-span-1 flex items-center space-x-2">
                          <rankInfo.icon className={`h-5 w-5 ${rankInfo.color}`} />
                          <span className="font-semibold">{player.rank}</span>
                        </div>
                        
                        <div className="md:col-span-3">
                          <Link 
                            to={`/player/${player.name}`}
                            className="font-semibold text-white hover:text-primary-400 transition-colors"
                          >
                            {player.name}
                          </Link>
                        </div>
                        
                        <div className="md:col-span-2 flex items-center space-x-2">
                          <ClassIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{player.characterClass || 'Unknown'}</span>
                        </div>
                        
                        <div className="md:col-span-2">
                          {player.guildName && player.guildName !== 'None' ? (
                            <Link 
                              to={`/guild/${player.guildName}`}
                              className="text-secondary-400 hover:text-secondary-300 transition-colors"
                            >
                              {player.guildName}
                            </Link>
                          ) : (
                            <span className="text-gray-500">None</span>
                          )}
                        </div>
                        
                        <div className="md:col-span-1 font-semibold text-primary-400">
                          {player.level || 0}
                        </div>
                        
                        <div className="md:col-span-1 font-semibold text-gold-400">
                          {player.resets || 0}
                        </div>
                        
                        <div className="md:col-span-1 font-semibold text-purple-400">
                          {player.masterLevel || 0}
                        </div>
                        
                        <div className="md:col-span-1 font-semibold text-red-400">
                          {player.pkCount || 0}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm text-gray-400 font-semibold pb-4 border-b border-dark-600">
                  <div>Rank</div>
                  <div className="md:col-span-2">Guild</div>
                  <div>Master</div>
                  <div>Members</div>
                  <div>Score</div>
                </div>
                
                {filteredGuilds.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Guilds Found</h3>
                    <p className="text-gray-400">
                      {searchTerm ? 'No guilds match your search criteria.' : 'No guild data available at the moment.'}
                    </p>
                  </div>
                ) : (
                  filteredGuilds.map((guild) => {
                    const rankInfo = getRankIcon(guild.rank);
                    
                    return (
                      <motion.div
                        key={guild.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center py-4 border-b border-dark-700 last:border-b-0 hover:bg-dark-700/30 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <rankInfo.icon className={`h-5 w-5 ${rankInfo.color}`} />
                          <span className="font-semibold">{guild.rank}</span>
                        </div>
                        
                        <div className="md:col-span-2">
                          <Link 
                            to={`/guild/${guild.name}`}
                            className="font-semibold text-white hover:text-primary-400 transition-colors"
                          >
                            {guild.name}
                          </Link>
                        </div>
                        
                        <div>
                          {guild.guildMaster && guild.guildMaster !== 'N/A' ? (
                            <Link 
                              to={`/player/${guild.guildMaster}`}
                              className="text-secondary-400 hover:text-secondary-300 transition-colors"
                            >
                              {guild.guildMaster}
                            </Link>
                          ) : (
                            <span className="text-gray-500">Unknown</span>
                          )}
                        </div>
                        
                        <div className="font-semibold text-primary-400">
                          {guild.memberCount || 0}
                        </div>
                        
                        <div className="font-semibold text-gold-400">
                          {guild.totalResets || 0}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8 pt-6 border-t border-dark-600">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center space-x-2">
                  {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded transition-colors ${
                          pagination.currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Rankings;
