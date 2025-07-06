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
import { useNavigate } from 'react-router-dom';
import config from '../config/env';
const Home = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
      // Set fallback data if API fails
      setServerStatus({
        statistics: {
          playersOnline: 0,
          totalAccounts: 0,
          totalCharacters: 0,
          totalGuilds: 0
        }
      });
      setTopPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // Use real data or fallback
  const playersOnline = serverStatus?.statistics?.playersOnline || 0;
  const totalOnline = playersOnline;

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
    <div className="min-h-screen retro-bg text-white">
      {/* Main Header Section */}
      <div className="retro-bg py-8 border-b border-retro-700">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            
            {/* Server Status Section */}
            <div className="lg:col-span-1 space-y-4">
              <div className="retro-card rounded p-4">
                <h3 className="text-lg font-bold retro-text-gold mb-4 flex items-center retro-glow">
                  <Server className="w-5 h-5 mr-2" />
                  SERVER STATUS
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="retro-text-orange font-bold">{playersOnline}</span>
                    <Link to="/server" className="text-gray-300 hover:retro-text-gold transition-colors">
                      {config.serverName}
                    </Link>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-retro-700">
                  <div className="flex justify-between text-sm">
                    <span>Total Online</span>
                    <span className="retro-text-orange font-bold">{totalOnline}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Characters</span>
                    <span className="retro-text-gold">{serverStatus?.statistics?.totalCharacters || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Accounts</span>
                    <span className="retro-text-gold">{serverStatus?.statistics?.totalAccounts || 0}</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-xs text-gray-400">EVENT TIME</div>
                  <div className="retro-text-gold font-mono retro-glow">15:01:05</div>
                </div>
              </div>

              {/* Download Section */}
              <div className="retro-card rounded p-4">
                <h3 className="text-lg font-bold retro-text-gold mb-4 flex items-center retro-glow">
                  <Download className="w-5 h-5 mr-2" />
                  DOWNLOAD
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Files needed to play on our {config.appName} server
                </p>
                <button onClick={() => window.open(config.downloadClientUrl, '_blank')} className="retro-button w-full px-4 py-2 rounded flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Game Client (2.1 GB)
                </button>
              </div>

              {/* Discord Section */}
              <div className="retro-card rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="retro-text-gold font-bold">Discord</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-mu-orange rounded-full mr-2 retro-pulse"></div>
                    <span className="retro-text-orange text-sm font-bold">100</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">Members Online</p>
                <button className="retro-button w-full px-4 py-2 rounded text-sm">
                  Connect
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Banner */}
              <div className="retro-card rounded-lg overflow-hidden">
                <div className="relative p-8 text-center retro-server-status">
                  <h1 className="text-4xl font-bold mb-4 retro-gradient-text retro-glow">
                    {config.appName.toUpperCase()}
                  </h1>
                  <p className="text-xl mb-6 retro-text-orange">
                    {config.serverSeason} MU Online Private Server
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="retro-button px-6 py-3 rounded font-bold">
                      <Play className="w-4 h-4 mr-2" />
                      PLAY NOW
                    </button>
                    <button className="retro-button px-6 py-3 rounded">
                      <Users className="w-4 h-4 mr-2" />
                      REGISTER
                    </button>
                  </div>
                </div>
              </div>

              {/* Last Forum Topics */}
              <div className="retro-card rounded p-4">
                <h3 className="text-lg font-bold retro-text-gold mb-4 flex items-center retro-glow">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  LAST TOPICS
                </h3>
                <div className="space-y-2">
                  {forumTopics.map((topic, index) => (
                    <div key={index} className="flex justify-between items-center text-sm hover:bg-retro-800 p-2 rounded cursor-pointer transition-colors">
                      <span className="retro-text-orange truncate hover:retro-text-gold">{topic.title}</span>
                      <span className="text-gray-400 text-xs whitespace-nowrap ml-2">{topic.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* News Section */}
              <div className="retro-card rounded p-4">
                <h3 className="text-lg font-bold retro-text-gold mb-4 flex items-center retro-glow">
                  <FileText className="w-5 h-5 mr-2" />
                  NEWS
                </h3>
                <div className="space-y-4">
                  {newsItems.map((news, index) => (
                    <div key={index} className="border-b border-retro-700 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="retro-text-orange font-semibold hover:retro-text-gold cursor-pointer transition-colors">
                          {news.title}
                        </h4>
                        <span className="text-gray-400 text-sm">{news.date}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{news.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Comments: {news.comments}</span>
                        <span className="retro-text-orange text-xs cursor-pointer hover:retro-text-gold transition-colors">
                          Read more →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Castle Treasury */}
              <div className="retro-card rounded p-4">
                <h3 className="text-sm font-bold retro-text-gold mb-2 retro-glow">CASTLE TREASURY</h3>
                <p className="text-xs text-gray-400 mb-3">State of the castle treasury</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Bonuses</span>
                    <span className="retro-text-gold font-bold">399</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zen</span>
                    <span className="retro-text-gold font-bold">0</span>
                  </div>
                </div>
                <p className="text-xs retro-text-orange mt-2 cursor-pointer hover:retro-text-gold transition-colors">
                  Current Castle siege owner HENTAI guild
                </p>
              </div>

              {/* Items Market */}
              <div className="retro-card rounded p-4">
                <h3 className="text-sm font-bold retro-text-gold mb-2 retro-glow">ITEMS MARKET</h3>
                <p className="text-xs text-gray-400 mb-3">Last items added on players market</p>
                <div className="space-y-2">
                  {marketItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="text-xs">
                      <div className="flex justify-between">
                        <span className="retro-text-orange truncate hover:retro-text-gold cursor-pointer transition-colors">{item.name}</span>
                        <span className="retro-text-gold font-bold">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <span className="retro-text-orange text-xs cursor-pointer hover:retro-text-gold transition-colors">
                    Go to items market →
                  </span>
                </div>
              </div>

              {/* Characters Market */}
              <div className="retro-card rounded p-4">
                <h3 className="text-sm font-bold retro-text-gold mb-2 retro-glow">CHARACTERS MARKET</h3>
                <p className="text-xs text-gray-400 mb-3">Last characters added on players market</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="retro-text-orange hover:retro-text-gold cursor-pointer transition-colors">Yuna</span>
                    <span className="retro-text-gold font-bold">1,200 Bon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="retro-text-orange hover:retro-text-gold cursor-pointer transition-colors">EEwKa</span>
                    <span className="retro-text-gold font-bold">12 Bon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="retro-text-orange hover:retro-text-gold cursor-pointer transition-colors">Ayahuasca</span>
                    <span className="retro-text-gold font-bold">240 Bon</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="retro-text-orange text-xs cursor-pointer hover:retro-text-gold transition-colors">
                    Go to characters market →
                  </span>
                </div>
              </div>

              {/* Rankings Preview */}
              <div className="retro-card rounded p-4">
                <h3 className="text-sm font-bold retro-text-gold mb-2 retro-glow">TOP PLAYERS</h3>
                <div className="space-y-2">
                  {topPlayers.length > 0 ? topPlayers.slice(0, 5).map((player, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-gray-300">#{index + 1}</span>
                      <span className="retro-text-orange hover:retro-text-gold cursor-pointer transition-colors">{player.name}</span>
                      <span className="retro-text-gold font-bold">{player.level}{player.resets > 0 ? ` (+${player.resets})` : ''}</span>
                    </div>
                  )) : (
                    <div className="text-center text-gray-400 text-xs py-4">
                      No players found
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <Link to="/rankings" className="retro-text-orange text-xs hover:retro-text-gold transition-colors">
                    View all rankings →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Content Section */}
      <div className="retro-bg py-8 border-t border-retro-700">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Screenshots */}
            <div className="retro-card rounded p-4">
              <h3 className="text-lg font-bold retro-text-gold mb-4 flex items-center retro-glow">
                <Camera className="w-5 h-5 mr-2" />
                SCREENSHOTS
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="aspect-square retro-card rounded cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <Camera className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <span className="retro-text-orange text-sm cursor-pointer hover:retro-text-gold transition-colors">
                  All screenshots →
                </span>
              </div>
            </div>

            {/* Announcements */}
            <div className="retro-card rounded p-4">
              <h3 className="text-lg font-bold retro-text-gold mb-4 flex items-center retro-glow">
                <Star className="w-5 h-5 mr-2" />
                ANNOUNCEMENTS
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-mu-gold rounded mr-2 mt-0.5 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    The new <span className="retro-text-orange">Jade x1000</span> server will launch on June 26th!
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-mu-gold rounded mr-2 mt-0.5 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    We don't make any wipes at all. Your items will always be with you.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-mu-gold rounded mr-2 mt-0.5 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    To run the game, add the folder to the defender exceptions!
                  </p>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="retro-card rounded p-4">
              <h3 className="text-lg font-bold retro-text-gold mb-4 flex items-center retro-glow">
                <Globe className="w-5 h-5 mr-2" />
                LANGUAGE
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['EN', 'RU', 'VN', 'ES', 'LV', 'BG', 'BR', 'LT', 'PL', 'RO', 'TR'].map((lang) => (
                  <button key={lang} className="retro-button px-2 py-1 rounded text-center transition-colors">
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
