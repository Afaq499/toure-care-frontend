import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const LiveSupportButton: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById('tawkto-script')) {
      setIsScriptLoaded(true);
      return;
    }

    // Load Tawk.to script
    const script = document.createElement('script');
    script.id = 'tawkto-script';
    script.async = true;
    script.src = 'https://embed.tawk.to/6780458049e2fd8dfe0558a1/1ih6guvpr';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.getElementById('tawkto-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const handleClick = () => {
    if (isScriptLoaded) {
      // @ts-ignore - Tawk.to API is loaded dynamically
      if (window.Tawk_API) {
        // @ts-ignore
        window.Tawk_API.toggle();
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 z-50"
    >
      <MessageCircle size={24} />
      {/* <span className="hidden sm:inline">Live Support</span> */}
    </button>
  );
};

export default LiveSupportButton; 