import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Check if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    return () => clearInterval(timer);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setInstallPrompt(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-icon">🚀</div>
        <h1>MHD PWA</h1>
        <p className="subtitle">Progressive Web App</p>
        
        <div className="status-card">
          <h2>Hello World! 👋</h2>
          <p>Welcome to your new PWA!</p>
          <div className="time-display">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>

        <div className="features">
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span>Add to Home Screen</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span>Fast & Responsive</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌐</span>
            <span>Works Offline</span>
          </div>
        </div>

        {installPrompt && !isInstalled && (
          <button className="install-button" onClick={handleInstallClick}>
            📱 Install App
          </button>
        )}

        {isInstalled && (
          <div className="installed-badge">
            ✅ App Installed!
          </div>
        )}

        <div className="instructions">
          <h3>How to Install:</h3>
          <p><strong>Chrome/Android:</strong> Tap the install button above or use browser menu</p>
          <p><strong>Safari/iOS:</strong> Tap Share → Add to Home Screen</p>
        </div>
      </header>
    </div>
  );
}

export default App;
