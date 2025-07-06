import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  HardDrive, 
  Wifi, 
  Shield, 
  Zap,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Monitor,
  Smartphone
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Downloads = () => {
  const downloadLinks = [
    {
      id: 'full-client',
      title: 'Full Game Client',
      description: 'Complete DV-Team MU Online client with all files',
      size: '2.1 GB',
      type: 'primary',
      icon: HardDrive,
      requirements: 'Windows 7/8/10/11',
      url: 'drive.google.com/file/d/1Xnk9m4G7h09UQ9DfyDxdwdRup34DXk79/view?usp=sharing'
    },
    // {
    //   id: 'update-patch',
    //   title: 'Latest Update Patch',
    //   description: 'Update patch for existing installations',
    //   size: '45 MB',
    //   type: 'secondary',
    //   icon: Download,
    //   requirements: 'Existing installation',
    //   url: '#'
    // },
    // {
    //   id: 'launcher',
    //   title: 'Game Launcher',
    //   description: 'Auto-updater and game launcher',
    //   size: '8 MB',
    //   type: 'ghost',
    //   icon: Zap,
    //   requirements: 'All Windows versions',
    //   url: '#'
    // }
  ];

  const systemRequirements = {
    minimum: {
      os: 'Windows 7 SP1 64-bit',
      processor: 'Intel Core 2 Duo / AMD Athlon 64 X2',
      memory: '2 GB RAM',
      graphics: 'DirectX 9 compatible',
      directx: 'Version 9.0c',
      storage: '3 GB available space',
      network: 'Broadband Internet connection'
    },
    recommended: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i3 / AMD FX-4300',
      memory: '4 GB RAM',
      graphics: 'DirectX 11 compatible',
      directx: 'Version 11',
      storage: '5 GB available space',
      network: 'Stable broadband connection'
    }
  };

  const installationSteps = [
     {
      step: 1,
      title: 'Create Account',
      description: 'Register your account if you haven\'t already',
      icon: Shield
    },
    {
      step: 2,
      title: 'Download Client',
      description: 'Download the full game client from the link above',
      icon: Download
    },
    {
      step: 3,
      title: 'Extract Files',
      description: 'Extract the downloaded files to your desired location',
      icon: FileText
    },
    {
      step: 4,
      title: 'Run main.exe',
      description: 'Execute main.exe to start the game',
      icon: Zap
    },
   
  ];

  const importantNotes = [
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Antivirus Software',
      description: 'Add the game folder to your antivirus exceptions to prevent blocking'
    },
    {
      type: 'info',
      icon: CheckCircle,
      title: 'Windows Defender',
      description: 'Windows Defender may flag the game files - this is normal for private servers'
    },
    {
      type: 'success',
      icon: Wifi,
      title: 'Stable Connection',
      description: 'Ensure you have a stable internet connection for the best experience'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title flex items-center justify-center">
            <Download className="h-12 w-12 text-primary-500 mr-4" />
            Downloads
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Download DV-Team MU Online and start your epic adventure
          </p>
        </motion.div>

        {/* Download Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {downloadLinks.map((download, index) => (
            <motion.div
              key={download.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="text-center h-full flex flex-col">
                <div className="mb-4">
                  <download.icon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{download.title}</h3>
                  <p className="text-gray-400 mb-4">{download.description}</p>
                </div>

                <div className="flex-1 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Size:</span>
                    <span className="font-semibold">{download.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Requirements:</span>
                    <span className="text-primary-400">{download.requirements}</span>
                  </div>
                </div>

                <Button
                  variant={download.type}
                  className="w-full"
                  onClick={() => window.open(download.url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card>
              <h2 className="text-2xl font-bold flex items-center mb-6">
                <Monitor className="h-6 w-6 text-primary-500 mr-3" />
                System Requirements
              </h2>

              <div className="space-y-6">
                {/* Minimum Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Minimum</h3>
                  <div className="space-y-2">
                    {Object.entries(systemRequirements.minimum).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-dark-700 last:border-b-0">
                        <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-gray-300 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Recommended</h3>
                  <div className="space-y-2">
                    {Object.entries(systemRequirements.recommended).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-dark-700 last:border-b-0">
                        <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-gray-300 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Installation Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card>
              <h2 className="text-2xl font-bold flex items-center mb-6">
                <FileText className="h-6 w-6 text-secondary-500 mr-3" />
                Installation Guide
              </h2>

              <div className="space-y-4">
                {installationSteps.map((step, index) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                    <step.icon className="h-5 w-5 text-primary-400" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                <p className="text-sm text-primary-300 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Need help? Join our Discord community for support!
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <Card>
            <h2 className="text-2xl font-bold flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
              Important Notes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {importantNotes.map((note, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    note.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    note.type === 'info' ? 'bg-blue-500/10 border-blue-500/20' :
                    'bg-green-500/10 border-green-500/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <note.icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                      note.type === 'warning' ? 'text-yellow-400' :
                      note.type === 'info' ? 'text-blue-400' :
                      'text-green-400'
                    }`} />
                    <div>
                      <h3 className="font-semibold mb-2">{note.title}</h3>
                      <p className="text-sm text-gray-400">{note.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12"
        >
          <Card variant="gradient" className="text-center">
            <h2 className="text-2xl font-bold mb-6">Need Additional Help?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-400 mb-3">Game Guides</h3>
                <p className="text-gray-400 mb-4">
                  Check out our comprehensive guides for new players
                </p>
                <Button variant="ghost">
                  <FileText className="h-4 w-4 mr-2" />
                  View Guides
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-400 mb-3">Community Support</h3>
                <p className="text-gray-400 mb-4">
                  Join our Discord for real-time help and community chat
                </p>
                <Button variant="ghost">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Discord
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Downloads;
