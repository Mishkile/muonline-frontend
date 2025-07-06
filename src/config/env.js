// Environment configuration
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  
  // App Information
  appName: import.meta.env.VITE_APP_NAME || 'Mishki MU Online',
  appVersion: import.meta.env.VITE_APP_VERSION || '19.2.3',
  
  // Download Links
  downloadClientUrl: import.meta.env.VITE_DOWNLOAD_CLIENT_URL || '#',
  
  // Social Media Links
  youtubeUrl: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com',
  facebookUrl: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com/mishkimu',
  instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/mishkimu',
  discordUrl: import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/mishkimu',
  
  // Server Information
  serverName: import.meta.env.VITE_SERVER_NAME || 'Mishki MU S19.2.3',
  serverSeason: import.meta.env.VITE_SERVER_SEASON || 'Season 19 Part 2-3',
};

export default config;
