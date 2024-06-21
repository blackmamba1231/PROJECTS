import React from 'react';
import { Signout } from './Signout';

export const Appbar = ({ firstName }) => {
  return (
    
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        <img
          src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg"
          alt="Paytm Logo"
        />
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello {firstName}</div>
        <div className='flex flex-col justify-center h-full mr-4'>
        <Signout />
        </div>
        </div>
      </div>
    
  );
};