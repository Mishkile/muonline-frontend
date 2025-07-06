import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import LoadingScreen from '../components/ui/LoadingScreen';
import Card from '../components/ui/Card';

const GuildProfile = () => {
  const { guildName } = useParams();
  const [guild, setGuild] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuildData = async () => {
      try {
        setLoading(true);
        const [guildResponse, membersResponse] = await Promise.all([
          api.get(`/guilds/${guildName}`),
          api.get(`/guilds/${guildName}/members`)
        ]);
        
        setGuild(guildResponse.data);
        setMembers(membersResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load guild data');
      } finally {
        setLoading(false);
      }
    };

    if (guildName) {
      fetchGuildData();
    }
  }, [guildName]);

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
        </Card>
      </div>
    );
  }

  if (!guild) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-400 mb-4">Guild Not Found</h2>
          <p className="text-gray-300">The guild "{guildName}" does not exist.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Guild Header */}
          <Card className="mb-8 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gold-400 mb-2">{guild.name}</h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span>Level: {guild.level}</span>
                  <span>•</span>
                  <span>Members: {guild.memberCount}/{guild.maxMembers}</span>
                  <span>•</span>
                  <span>Master: {guild.master}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gold-400">{guild.score}</div>
                <div className="text-gray-400">Guild Score</div>
              </div>
            </div>
            
            {guild.notice && (
              <div className="bg-dark-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-gold-400">Guild Notice</h3>
                <p className="text-gray-300">{guild.notice}</p>
              </div>
            )}
          </Card>

          {/* Guild Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{guild.wins || 0}</div>
              <div className="text-gray-400">Guild Wars Won</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{guild.losses || 0}</div>
              <div className="text-gray-400">Guild Wars Lost</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {guild.wins && guild.losses ? 
                  ((guild.wins / (guild.wins + guild.losses)) * 100).toFixed(1) + '%' : 
                  'N/A'
                }
              </div>
              <div className="text-gray-400">Win Rate</div>
            </Card>
          </div>

          {/* Guild Members */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gold-400 mb-6">Guild Members</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left py-3 text-gray-400">Rank</th>
                    <th className="text-left py-3 text-gray-400">Character</th>
                    <th className="text-left py-3 text-gray-400">Level</th>
                    <th className="text-left py-3 text-gray-400">Class</th>
                    <th className="text-left py-3 text-gray-400">Status</th>
                    <th className="text-left py-3 text-gray-400">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <motion.tr
                      key={member.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-dark-800 hover:bg-dark-800 transition-colors"
                    >
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          member.rank === 'Master' ? 'bg-gold-500/20 text-gold-400' :
                          member.rank === 'Assistant' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {member.rank || 'Member'}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                          {member.name}
                        </span>
                      </td>
                      <td className="py-3 text-gray-300">{member.level}</td>
                      <td className="py-3 text-gray-300">{member.class}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          member.online ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {member.online ? 'Online' : 'Offline'}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">
                        {member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : 'Never'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              
              {members.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No members found
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GuildProfile;
