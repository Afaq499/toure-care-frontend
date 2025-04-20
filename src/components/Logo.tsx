import React from 'react';
import { Compass } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <h1 className="text-xl font-semibold flex items-center">
        <span className="text-white">Tourism</span>
        <Compass size={24} className="mx-1 text-orange-500" />
        <span className="text-orange-500">Cares</span>
      </h1>
    </div>
  );
};

export default Logo;