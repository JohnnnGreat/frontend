import { Loader2 } from 'lucide-react';
import React from 'react';

const Loader = () => {
  return (
    <div className='h-screen bg-black opacity-70 w-full  fixed top-0 left-0 flex items-center justify-center'>
      <Loader2 className='w-7 animate-spin text-white' />
    </div>
  );
};

export default Loader;
