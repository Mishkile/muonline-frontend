import React, { useState, useEffect } from 'react';
import { 
  User, 
  Shield, 
  Sword, 
  Crown, 
  Star, 
  Heart, 
  Zap, 
  Users,
  Calendar,
  MapPin,
  Award,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  CloudCog
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI, playersAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Profile = () => {
  const { user } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pkClearLoading, setPkClearLoading] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getCharacters();
      console.log('Fetched characters:', response);
      
      // The data structure is response.data.data.characters
      const charactersData = response.data?.data?.characters || response.data?.characters || [];
      console.log('Characters data:', charactersData);
      
      setCharacters(charactersData);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setMessage({ type: 'error', text: 'Failed to load characters' });
    } finally {
      setLoading(false);
    }
  };

  const handlePKClear = async (characterName) => {
    if (!window.confirm(`Are you sure you want to clear PK status for ${characterName}? This action costs 100 Credits.`)) {
      return;
    }

    try {
      setPkClearLoading(prev => ({ ...prev, [characterName]: true }));
      
      // Call the PK clear API endpoint
      const response = await userAPI.clearPK(characterName);
      
      if (response.data.success) {
        setMessage({ type: 'success', text: `PK status cleared for ${characterName}!` });
        // Refresh characters to show updated PK status and credits
        fetchCharacters();
      } else {
        setMessage({ type: 'error', text: response.data.message || 'Failed to clear PK status' });
      }
    } catch (error) {
      console.error('Error clearing PK:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to clear PK status' 
      });
    } finally {
      setPkClearLoading(prev => ({ ...prev, [characterName]: false }));
    }
  };

  const getClassIcon = (className) => {
    switch (className?.toLowerCase()) {
      case 'dark wizard':
      case 'soul master':
      case 'grand master':
        return <Zap className="h-5 w-5" />;
      case 'dark knight':
      case 'blade knight':
      case 'blade master':
        return <Sword className="h-5 w-5" />;
      case 'fairy elf':
      case 'muse elf':
      case 'high elf':
        return <Heart className="h-5 w-5" />;
      case 'magic gladiator':
        return <Shield className="h-5 w-5" />;
      case 'dark lord':
        return <Crown className="h-5 w-5" />;
      case 'summoner':
        return <Star className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getPKStatusColor = (pkLevel) => {
    if (pkLevel === 0) return 'text-white';
    if (pkLevel <= 2) return 'text-orange-400';
    if (pkLevel <= 4) return 'text-red-400';
    return 'text-purple-400';
  };

  const getPKStatusText = (pkLevel) => {
    if (pkLevel === 0) return 'Hero';
    if (pkLevel <= 2) return 'Commoner';
    if (pkLevel <= 4) return 'Warning';
    return 'Murderer';
  };

  const canClearPK = (pkLevel) => pkLevel > 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner mr-2"></div>
        <span className="mu-text">Loading your characters...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
      `
    }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="hero-title text-4xl mb-4">Warrior's Profile</h1>
          <p className="mu-subtitle text-lg">Manage your characters and enhance your legend</p>
        </div>

        {/* User Info Card */}
        <div className="card mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <User className="h-16 w-16 text-gold-400" style={{ color: '#d4af37' }} />
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-gray-900"></div>
            </div>
            <div>
              <h2 className="mu-title text-2xl">{user?.username}</h2>
              <p className="mu-text">{user?.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm mu-subtitle">
                  <Crown className="h-4 w-4 inline mr-1" style={{ color: '#d4af37' }} />
                  VIP Level: {user?.vipStatus >= 0 ? user.vipStatus : 'None'}
                </span>
                <span className="text-sm mu-subtitle">
                  <Star className="h-4 w-4 inline mr-1" style={{ color: '#d4af37' }} />
                  Credits: {user?.credits || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 mr-2" />
              )}
              {message.text}
            </div>
          </div>
        )}

        {/* Characters Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="mu-title text-xl">Your Characters</h3>
            <button
              onClick={fetchCharacters}
              className="btn-secondary flex items-center"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {characters.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-16 w-16 mx-auto mb-4 text-gray-500" />
              <h4 className="mu-title text-lg mb-2">No Characters Found</h4>
              <p className="mu-text text-sm">Create your first character in-game to see it here.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {characters.map((character, index) => (
                <div
                  key={character.name || index}
                  className="card-glass p-6 hover:border-gold-400/30 transition-colors"
                >
                  {/* Character Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getClassIcon(character.class)}
                      <div>
                        <h4 className="mu-title text-lg">{character.name}</h4>
                        <p className="text-sm mu-subtitle">{character.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold gradient-text">{character.level}</div>
                      <div className="text-xs mu-subtitle">Level</div>
                    </div>
                  </div>

                  {/* Character Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-400">{character.map || 'Unknown'}</div>
                      <div className="text-xs mu-subtitle">Location</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-400">{character.guild || 'None'}</div>
                      <div className="text-xs mu-subtitle">Guild</div>
                    </div>
                  </div>

                  {/* PK Status */}
                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm mu-text">PK Status:</span>
                      <span className={`text-sm font-bold ${getPKStatusColor(character.pkLevel || 0)}`}>
                        {getPKStatusText(character.pkLevel || 0)}
                      </span>
                    </div>
                    {character.pkLevel > 0 && (
                      <div className="text-xs text-red-400 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        PK Count: {character.pkLevel}
                      </div>
                    )}
                  </div>

                  {/* PK Clear Button */}
                  {canClearPK(character.pkLevel || 0) && (
                    <button
                      onClick={() => handlePKClear(character.name)}
                      disabled={pkClearLoading[character.name] || (user?.credits || 0) < 100}
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      {pkClearLoading[character.name] ? (
                        <div className="loading-spinner mr-2"></div>
                      ) : (
                        <Shield className="h-4 w-4 mr-2" />
                      )}
                      {pkClearLoading[character.name] ? 'Clearing...' : 'Clear PK (100 Credits)'}
                    </button>
                  )}

                  {!canClearPK(character.pkLevel || 0) && (
                    <div className="w-full p-2 text-center text-sm mu-text bg-green-500/10 border border-green-500/20 rounded">
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Hero Status - No PK to clear
                    </div>
                  )}

                  {(user?.credits || 0) < 100 && canClearPK(character.pkLevel || 0) && (
                    <div className="text-xs text-red-400 text-center mt-2">
                      Insufficient credits for PK clear
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Credits Info */}
        <div className="card-glass mt-8 p-6">
          <h4 className="mu-title text-lg mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2" style={{ color: '#d4af37' }} />
            Credits Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="mu-text font-medium mb-2">Current Balance</h5>
              <div className="text-2xl font-bold gradient-text">{user?.credits || 0} Credits</div>
            </div>
            <div>
              <h5 className="mu-text font-medium mb-2">Services Available</h5>
              <ul className="text-sm mu-subtitle space-y-1">
                <li>• PK Clear: 100 Credits</li>
                <li>• Character Reset: 200 Credits</li>
                <li>• Stat Reset: 150 Credits</li>
                <li>• Name Change: 300 Credits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
