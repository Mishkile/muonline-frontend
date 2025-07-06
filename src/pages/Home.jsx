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
  Target,
  Globe,
  MessageSquare,
  FileText,
  Activity,
  Clock,
  TrendingUp,
  Award,
  ShoppingCart,
  Camera,
  ExternalLink
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

  const servers = [
    { name: 'x10 Titan', online: 421, rate: 'x10', status: 'online' },
    { name: 'x100 King', online: 312, rate: 'x100', status: 'online' },
    { name: 'x1000 Jade', online: 1094, rate: 'x1000', status: 'online' },
    { name: 'x5000 Prime', online: 299, rate: 'x5000', status: 'online' }
  ];

  const totalOnline = servers.reduce((sum, server) => sum + server.online, 0);

  const newsItems = [
    {
      date: '26.06.25',
      title: 'Jade x1000 has opened!',
      excerpt: 'New server Jade x1000 is now open! Welcome and have fun!',
      comments: 0
    },
    {
      date: '17.06.25', 
      title: 'New Season 20 server - Jade x1000',
      excerpt: 'It\'s June, and that means it\'s time for our new high-rate server – Jade x1000...',
      comments: 12
    },
    {
      date: '09.04.25',
      title: 'MUX Legend 5-year anniversary',
      excerpt: 'Hello to all MUX Legend players — today we proudly celebrate the 5-year anniversary...',
      comments: 14
    }
  ];

  const marketItems = [
    { name: 'Jewel of Soul x5', price: '29 Bon', server: 'Prime' },
    { name: 'Exc. Steel Plate Armor', price: '696 kk Zen', server: 'Prime' },
    { name: 'Exc. Black Origin Pants', price: '464 kk Zen', server: 'Prime' },
    { name: 'HA ELF Holyangel Set', price: '232 Bon', server: 'Prime' },
    { name: 'Cloak of Transcendence', price: '464 Bon', server: 'Prime' }
  ];

  const forumTopics = [
    { title: 'Fire Divine Spirit He...', time: '12:09 - 06.07.2025' },
    { title: 'Increasing FPS', time: '22:58 - 05.07.2025' },
    { title: '[In-Game Event] KING...', time: '11:02 - 05.07.2025' },
    { title: '[In-Game Event] TITAN...', time: '11:02 - 05.07.2025' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Retro Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
          `
        }}>
          <div className="retro-grid absolute inset-0 opacity-20"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 opacity-30 animate-float">
            <Sword className="h-16 w-16 text-retro animate-glow" />
          </div>
          <div className="absolute top-40 right-16 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
            <Shield className="h-20 w-20 text-retro animate-glow" />
          </div>
          <div className="absolute bottom-40 left-20 opacity-25 animate-float" style={{ animationDelay: '4s' }}>
            <Crown className="h-12 w-12 text-retro animate-glow" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mu-window p-12">
            <h1 className="hero-title text-6xl md:text-8xl mb-6">
              DV-Team MU Online
            </h1>
            
            <p className="text-xl md:text-2xl mu-subtitle mb-8">
              Season 19 Part 2-3 • 1000x EXP • Custom Content
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <button className="btn-classic flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Playing</span>
              </button>
              <Link to="/downloads" className="btn-ghost flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Client</span>
              </Link>
            </div>

            {/* Server Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="card-glass text-center p-4">
                <div className="text-2xl font-bold gradient-text">
                  {loading ? '...' : serverStatus?.onlineCount || '0'}
                </div>
                <div className="mu-subtitle">Players Online</div>
              </div>
              <div className="card-glass text-center p-4">
                <div className="text-2xl font-bold status-online">
                  {loading ? '...' : serverStatus?.status || 'ONLINE'}
                </div>
                <div className="mu-subtitle">Server Status</div>
              </div>
              <div className="card-glass text-center p-4">
                <div className="text-2xl font-bold gradient-text">S19.2.3</div>
                <div className="mu-subtitle">Season</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mu-title text-4xl mb-4">Why Choose DV-Team?</h2>
            <p className="mu-text text-lg">Experience the ultimate MU Online adventure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="mb-6">
                  <feature.icon className={`h-12 w-12 mx-auto ${feature.color} animate-glow`} />
                </div>
                <h3 className="mu-title text-xl mb-3">{feature.title}</h3>
                <p className="mu-text text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-4 bg-black bg-opacity-30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mu-title text-4xl mb-4">Daily Events</h2>
            <p className="mu-text text-lg">Join exciting events for exclusive rewards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <event.icon className="h-8 w-8 text-retro mr-3" />
                  <div>
                    <h3 className="mu-title text-lg">{event.title}</h3>
                    <div className="text-sm mu-subtitle">{event.time}</div>
                  </div>
                </div>
                <p className="mu-text text-sm mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="rank-badge">
                    {event.participants} Players
                  </span>
                  <button className="btn-ghost btn-sm">
                    Join Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mu-title text-4xl mb-4">Top Warriors</h2>
            <p className="mu-text text-lg">The strongest players in the realm</p>
          </div>

          <div className="card">
            <div className="overflow-x-auto">
              <table className="table-classic">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Character</th>
                    <th>Class</th>
                    <th>Level</th>
                    <th>Resets</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8">
                        <div className="loading-spinner mx-auto"></div>
                      </td>
                    </tr>
                  ) : topPlayers.length > 0 ? (
                    topPlayers.map((player, index) => (
                      <tr key={index}>
                        <td>
                          <span className="rank-badge">#{index + 1}</span>
                        </td>
                        <td className="font-semibold gradient-text">{player.name}</td>
                        <td className="mu-text">{player.class || 'Unknown'}</td>
                        <td className="text-retro">{player.level}</td>
                        <td className="text-retro">{player.resets || 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-8 mu-text">
                        No players found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-6">
              <Link to="/rankings" className="btn-primary">
                <Trophy className="h-4 w-4 mr-2" />
                View Full Rankings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black bg-opacity-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mu-window p-12">
            <h2 className="hero-title text-4xl mb-6">Ready to Begin Your Adventure?</h2>
            <p className="mu-text text-lg mb-8">
              Join thousands of players in the most epic MU Online experience
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/register" className="btn-classic">
                <User className="h-5 w-5 mr-2" />
                Create Account
              </Link>
              <Link to="/downloads" className="btn-ghost">
                <Download className="h-5 w-5 mr-2" />
                Download Game
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
